import { defineStore } from 'pinia'

export interface ThemeConfig {
  primaryColor: string
  backgroundColor: string
  textColor: string
  borderRadius: string
}

const DEFAULT_THEME: ThemeConfig = {
  primaryColor: '#3b82f6', // blue-500
  backgroundColor: '#ffffff',
  textColor: '#1f2937', // gray-800
  borderRadius: '0.5rem',
}

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: { ...DEFAULT_THEME } as ThemeConfig,
    isLoading: false
  }),

  actions: {
    // 应用主题到 CSS 变量
    applyTheme() {
      if (process.client) {
        const root = document.documentElement
        root.style.setProperty('--primary-color', this.theme.primaryColor)
        root.style.setProperty('--bg-color', this.theme.backgroundColor)
        root.style.setProperty('--text-color', this.theme.textColor)
        root.style.setProperty('--border-radius', this.theme.borderRadius)
      } else {
        useHead({
          style: [
            {
              innerHTML: `:root {
                --primary-color: ${this.theme.primaryColor};
                --bg-color: ${this.theme.backgroundColor};
                --text-color: ${this.theme.textColor};
                --border-radius: ${this.theme.borderRadius};
              }`
            }
          ]
        })
      }
    },

    // 从服务端加载配置
    async fetchTheme(userId?: string) {
      if (!userId) return

      this.isLoading = true
      try {
        const data = await $fetch<ThemeConfig>('/api/theme', {
          params: { userId }
        })
        
        if (data) {
          this.theme = { ...DEFAULT_THEME, ...data }
          this.applyTheme()
        }
      } catch (e) {
        console.error('Failed to fetch theme:', e)
      } finally {
        this.isLoading = false
      }
    },

    // 更新并保存配置
    async updateTheme(newConfig: Partial<ThemeConfig>, userId?: string) {
      this.theme = { ...this.theme, ...newConfig }
      this.applyTheme()

      if (userId) {
        try {
          await $fetch('/api/theme', {
            method: 'POST',
            body: {
              userId,
              config: this.theme
            }
          })
        } catch (e) {
          console.error('Failed to save theme:', e)
        }
      }
    },

    resetTheme() {
      this.theme = { ...DEFAULT_THEME }
      this.applyTheme()
    }
  }
})
