document.getElementById('uploadInput').addEventListener('change', function() {
    const thumbnailContainer = document.getElementById('thumbnailContainer')
    thumbnailContainer.innerHTML = ''

    if (uploadInput) {
        uploadInput.addEventListener('change', function() {
            thumbnailContainer.innerHTML = ''; // Limpar o contêiner de miniaturas

            // Iterar sobre os arquivos selecionados
            [...this.files].forEach(file => {
                const fileReader = new FileReader();

                fileReader.onload = function(e) {
                    if (file.type.startsWith('image/')) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        thumbnailContainer.appendChild(img);
                    } else {
                        const fileIcon = document.createElement('div');
                        fileIcon.className = 'file-icon';
                        fileIcon.textContent = '📄';
                        thumbnailContainer.appendChild(fileIcon);
                    }
                };

                if (file.type.startsWith('image/')) {
                    fileReader.readAsDataURL(file);
                } else {
                    // Se não for uma imagem, ainda processar o arquivo para mostrar um ícone
                    fileReader.readAsDataURL(file);
                }
            });
        });
    } else {
        console.error('Elemento de input não encontrado!');
    }
});


async function upload() {
    const fileInput = document.getElementById("uploadInput");
    const fileLabel = document.getElementById('fileLabel');
    const uploadButton = document.getElementById('uploadButton');
    const progressElement = document.getElementById('uploadProgress');
    const loader = document.getElementById('loader');

    fileInput.disabled = true;
    fileLabel.style.pointerEvents = 'none';
    fileLabel.setAttribute('disabled', 'true');
    uploadButton.disabled = true
    loader.style.display = 'block'
    progressElement.hidden = false;
    
    
    const su = new SmashUploader({ region: "us-east-1", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMyY2RmNTE2LTc3MmUtNGFmZC05YjIwLTFmZmIxMzQyZWQzMS1ldSIsInVzZXJuYW1lIjoiN2E3NThhMmMtMDAxNC00NzI5LTg0NDQtZmUxYjM0NDhiOWY2IiwicmVnaW9uIjoidXMtZWFzdC0xIiwiaXAiOiIxOTEuMTAuMjguMjM2Iiwic2NvcGUiOiJOb25lIiwiYWNjb3VudCI6IjdjODhhMGY3LWJiMDktNDk5OS04MTI5LTNjNjA5NjFkODQxMi1lYSIsImlhdCI6MTcyNDE1NjgyNiwiZXhwIjo0ODc5OTE2ODI2fQ.9ZPho97tPBJyb49sHviWxioRdD-fzbpxHaM5j_408d4" })

    try {
        const transfer = await su.upload({ files: [...fileInput.files] });
        console.log("Transfer", transfer); 
        progressElement.value = 100;
    } 
    catch(error) { 
        console.log("Error", error); 
        progressElement.hidden = true;
    }
    finally {
        fileInput.disabled = false;
        fileLabel.style.pointerEvents = 'auto';
        fileLabel.removeAttribute('disabled')
        uploadButton.disabled = false;
        loader.style.display = 'none';
    }

        su.on('progress', (event) => {
            const progressData = event.data && event.data.progress;
            if (progressData && progressData.percent !== undefined) {
                progressElement.value = progressData.percent;
                console.log("Progress", progressData.percent);
            } else {
                console.log("An error has occurred.");
            }
    });

}