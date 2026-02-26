<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <section class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-2xl">
      <div class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      <div class="relative z-10 px-8 py-20 text-center md:py-32">
        <h1 class="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-blue-500 to-purple-500">
          Nuxt 3 Demo Project
        </h1>
        <p class="mx-auto mb-10 max-w-2xl text-lg text-gray-300 md:text-xl">
          Exploration of Nuxt 3 features including TSX, Styled Components, SSR, Plugins, and more.
          Built with TypeScript and Tailwind CSS.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <NuxtLink 
            to="/components-demo" 
            class="rounded-full bg-green-500 px-8 py-3 font-bold text-white transition-transform hover:scale-105 hover:bg-green-600 shadow-lg shadow-green-500/30"
          >
            Explore Components
          </NuxtLink>
          <a 
            href="https://nuxt.com" 
            target="_blank" 
            class="rounded-full border border-gray-600 bg-gray-800/50 px-8 py-3 font-bold text-gray-300 backdrop-blur-sm transition-colors hover:bg-gray-700 hover:text-white"
          >
            Nuxt Documentation
          </a>
        </div>
      </div>
    </section>

    <!-- Features Grid -->
    <section>
      <h2 class="mb-8 text-2xl font-bold text-gray-800">Feature Demos</h2>
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink 
          v-for="feature in features" 
          :key="feature.path" 
          :to="feature.path"
          class="group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:border-green-200"
        >
          <div class="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
            <component :is="feature.icon" class="h-6 w-6" />
          </div>
          <h3 class="mb-2 text-xl font-bold text-gray-900 group-hover:text-green-600">{{ feature.title }}</h3>
          <p class="text-gray-600">{{ feature.description }}</p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { 
  CubeIcon, 
  CodeBracketIcon, 
  SwatchIcon, 
  CommandLineIcon, 
  PuzzlePieceIcon,
  GlobeAltIcon
} from '@heroicons/vue/24/outline'

const features = [
  {
    title: 'Components',
    description: 'Showcase of reusable global components like Modals, Toasts, and Loaders.',
    path: '/components-demo',
    icon: CubeIcon
  },
  {
    title: 'TSX Support',
    description: 'Write Vue components using JSX/TSX syntax for better flexibility.',
    path: '/tsx-demo',
    icon: CodeBracketIcon
  },
  {
    title: 'Styled Components',
    description: 'CSS-in-JS styling using vue3-styled-components with theme support.',
    path: '/styled-demo',
    icon: SwatchIcon
  },
  {
    title: 'SSR & Data Fetching',
    description: 'Server-Side Rendering capabilities and data fetching patterns.',
    path: '/ssr-demo',
    icon: GlobeAltIcon
  },
  {
    title: 'Plugins System',
    description: 'Extending Nuxt functionality with custom plugins.',
    path: '/plugins-demo',
    icon: PuzzlePieceIcon
  },
  {
    title: 'TypeScript Utils',
    description: 'Type-safe utility functions and composables.',
    path: '/utils-demo',
    icon: CommandLineIcon
  }
]
</script>
