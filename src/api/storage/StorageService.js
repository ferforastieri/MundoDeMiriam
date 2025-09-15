class StorageService {
  constructor() {
    this.baseUrl = 'https://api.example.com' // Substitua pela sua API real
  }

  // Upload de arquivo
  async uploadFile(file, path = 'uploads/') {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('path', path)

      const response = await fetch(`${this.baseUrl}/upload`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Erro no upload do arquivo')
      }

      const result = await response.json()
      return {
        success: true,
        url: result.url,
        filename: result.filename
      }
    } catch (error) {
      console.error('Erro no upload:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Deletar arquivo
  async deleteFile(fileUrl) {
    try {
      const response = await fetch(`${this.baseUrl}/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: fileUrl })
      })

      if (!response.ok) {
        throw new Error('Erro ao deletar arquivo')
      }

      return {
        success: true
      }
    } catch (error) {
      console.error('Erro ao deletar arquivo:', error)
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Listar arquivos
  async listFiles(path = 'uploads/') {
    try {
      const response = await fetch(`${this.baseUrl}/list?path=${path}`)
      
      if (!response.ok) {
        throw new Error('Erro ao listar arquivos')
      }

      const files = await response.json()
      return {
        success: true,
        files
      }
    } catch (error) {
      console.error('Erro ao listar arquivos:', error)
      return {
        success: false,
        error: error.message,
        files: []
      }
    }
  }

  // Mock para desenvolvimento - simula upload local
  async uploadFileMock(file, path = 'uploads/') {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUrl = URL.createObjectURL(file)
        resolve({
          success: true,
          url: mockUrl,
          filename: file.name
        })
      }, 1000) // Simula delay de upload
    })
  }

  // Mock para desenvolvimento - simula delete
  async deleteFileMock(fileUrl) {
    return new Promise((resolve) => {
      setTimeout(() => {
        URL.revokeObjectURL(fileUrl)
        resolve({
          success: true
        })
      }, 500)
    })
  }
}

// Instância singleton
const storageService = new StorageService()

export default storageService
