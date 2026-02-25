import type { FetchOptions } from 'ofetch'

// 定义后端返回的标准数据结构
interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

class Http {
  private baseUrl: string

  constructor(baseUrl: string = '/api') {
    this.baseUrl = baseUrl
  }

  // 核心请求方法
  private async request<T>(url: string, options: FetchOptions = {}): Promise<T> {
    const defaultOptions: FetchOptions = {
      baseURL: this.baseUrl,
      // 请求拦截
      onRequest({ options }) {
        // 这里可以添加全局 token
        // const token = useCookie('token').value
        // if (token) {
        //   options.headers = { ...options.headers, Authorization: `Bearer ${token}` }
        // }
      },
      // 响应拦截
      onResponse({ response }) {
        if (!response.ok) {
          // 处理 HTTP 错误
          throw new Error(`HTTP Error: ${response.status}`)
        }
        // 这里可以处理后端统一的错误码
        // if (response._data.code !== 200) { ... }
      },
      onResponseError({ response }) {
        // 处理响应错误
        console.error('Response Error:', response.statusText)
      }
    }

    // 合并选项
    const newOptions: FetchOptions = {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers
      }
    }

    return $fetch<T>(url, newOptions as any)
  }

  // GET 请求
  public get<T>(url: string, params?: any, options?: FetchOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'GET',
      query: params
    })
  }

  // POST 请求
  public post<T>(url: string, body?: any, options?: FetchOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body
    })
  }

  // PUT 请求
  public put<T>(url: string, body?: any, options?: FetchOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body
    })
  }

  // DELETE 请求
  public delete<T>(url: string, params?: any, options?: FetchOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'DELETE',
      query: params
    })
  }

  // 上传文件
  public upload<T>(url: string, file: File | Blob, fieldName: string = 'file', otherParams: Record<string, any> = {}): Promise<T> {
    const formData = new FormData()
    formData.append(fieldName, file)
    
    // 添加其他参数
    Object.keys(otherParams).forEach(key => {
      formData.append(key, otherParams[key])
    })

    return this.request<T>(url, {
      method: 'POST',
      body: formData
      // $fetch 会自动设置 Content-Type 为 multipart/form-data
    })
  }

  // 下载文件
  public async download(url: string, fileName?: string, params?: any): Promise<void> {
    try {
      const blob = await this.request<Blob>(url, {
        method: 'GET',
        query: params,
        responseType: 'blob'
      })

      // 创建下载链接
      const downloadUrl = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = downloadUrl
      
      // 如果没有提供文件名，尝试从 URL 或响应头中获取（这里简单实现）
      if (!fileName) {
        fileName = url.split('/').pop() || 'download'
      }
      
      link.setAttribute('download', fileName)
      document.body.appendChild(link)
      link.click()
      
      // 清理
      link.remove()
      window.URL.revokeObjectURL(downloadUrl)
    } catch (error) {
      console.error('Download failed:', error)
      throw error
    }
  }
}

// 导出单例
export const http = new Http()
