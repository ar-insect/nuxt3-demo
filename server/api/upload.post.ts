export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  
  if (!formData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No file uploaded'
    })
  }

  return {
    code: 200,
    message: 'File uploaded successfully',
    data: {
      files: formData.map(file => ({
        filename: file.filename,
        type: file.type,
        size: file.data.length
      }))
    }
  }
})
