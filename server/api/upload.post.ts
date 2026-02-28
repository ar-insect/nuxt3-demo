import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { randomUUID } from 'crypto'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  
  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file uploaded'
    })
  }

  const file = formData[0]
  if (!file.filename) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid file'
    })
  }

  // Ensure uploads directory exists
  const uploadDir = join(process.cwd(), 'public', 'uploads')
  await mkdir(uploadDir, { recursive: true })

  // Generate unique filename
  const ext = file.filename.split('.').pop() || 'png'
  const filename = `${randomUUID()}.${ext}`
  const filePath = join(uploadDir, filename)

  // Save file
  await writeFile(filePath, file.data)

  return {
    code: 200,
    message: 'File uploaded successfully',
    data: {
      url: `/uploads/${filename}`,
      filename: file.filename,
      type: file.type,
      size: file.data.length
    }
  }
})
