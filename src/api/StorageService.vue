<script setup>
import { ref } from 'vue';
import { storage } from '../firebase';
import { ref as storageRef, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const auth = getAuth();
const uploadProgress = ref(0);
const error = ref(null);
const isUploading = ref(false);

const uploadFile = async (file, path = 'images/') => {
  console.log('StorageService: Iniciando upload...', { file, path });
  
  if (!auth.currentUser) {
    console.error('StorageService: Usuário não autenticado');
    throw new Error('Usuário não autenticado');
  }

  try {
    isUploading.value = true;
    error.value = null;
    uploadProgress.value = 0;

    console.log('StorageService: Criando referência do arquivo...');
    const fileRef = storageRef(storage, `${path}${file.name}`);
    console.log('StorageService: Referência criada:', fileRef);
    
    console.log('StorageService: Iniciando upload com uploadBytesResumable...');
    const uploadTask = uploadBytesResumable(fileRef, file);
    console.log('StorageService: UploadTask criado:', uploadTask);
    
    return new Promise((resolve, reject) => {
      console.log('StorageService: Configurando listeners do upload...');
      uploadTask.on('state_changed',
        (snapshot) => {
          console.log('StorageService: Progresso do upload:', snapshot);
          uploadProgress.value = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        (err) => {
          console.error('StorageService: Erro durante o upload:', err);
          error.value = err;
          isUploading.value = false;
          reject(err);
        },
        async () => {
          console.log('StorageService: Upload concluído, obtendo URL...');
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log('StorageService: URL obtida:', downloadURL);
            isUploading.value = false;
            resolve({
              url: downloadURL,
              path: uploadTask.snapshot.ref.fullPath
            });
          } catch (err) {
            console.error('StorageService: Erro ao obter URL:', err);
            error.value = err;
            isUploading.value = false;
            reject(err);
          }
        }
      );
    });
  } catch (err) {
    console.error('StorageService: Erro no upload:', err);
    error.value = err;
    isUploading.value = false;
    throw err;
  }
};

const deleteFile = async (filePath) => {
  console.log('StorageService: Iniciando deleção...', { filePath });
  
  // Verifica se o usuário está autenticado
  if (!auth.currentUser) {
    console.error('StorageService: Usuário não autenticado');
    throw new Error('Usuário não autenticado');
  }

  try {
    const fileRef = storageRef(storage, filePath);
    console.log('StorageService: Referência do arquivo para deleção:', fileRef);
    await deleteObject(fileRef);
    console.log('StorageService: Arquivo deletado com sucesso');
    return true;
  } catch (err) {
    console.error('StorageService: Erro ao deletar arquivo:', err);
    error.value = err;
    throw err;
  }
};

const getFileUrl = async (filePath) => {
  console.log('StorageService: Obtendo URL do arquivo...', { filePath });
  try {
    const fileRef = storageRef(storage, filePath);
    console.log('StorageService: Referência do arquivo:', fileRef);
    const url = await getDownloadURL(fileRef);
    console.log('StorageService: URL obtida:', url);
    return url;
  } catch (err) {
    console.error('StorageService: Erro ao obter URL:', err);
    error.value = err;
    throw err;
  }
};

// Exportando as funcionalidades
defineExpose({
  uploadFile,
  deleteFile,
  getFileUrl,
  uploadProgress,
  error,
  isUploading
});
</script> 