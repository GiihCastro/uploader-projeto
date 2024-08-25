document.getElementById('uploadInput').addEventListener('change', function() {
    const thumbnailContainer = document.getElementById('thumbnailContainer');
    thumbnailContainer.innerHTML = ''; // Limpar o contêiner de miniaturas

    // Iterar sobre os arquivos selecionados
    [...this.files].forEach(file => {
        const fileReader = new FileReader();

        fileReader.onload = function(e) {
            if (file.type.startsWith('image/')) {
                // Se o arquivo for uma imagem
                const img = document.createElement('img');
                img.src = e.target.result;
                thumbnailContainer.appendChild(img);
            } else {
                // Para arquivos que não são imagens
                const fileIcon = document.createElement('div');
                fileIcon.className = 'file-icon';
                fileIcon.textContent = '📄'; // Ícone para arquivos não-imagem
                thumbnailContainer.appendChild(fileIcon);
            }
        };

        fileReader.readAsDataURL(file);
    });
});


async function upload() {
    const fileInput = document.getElementById("uploadInput");
    const fileLabel = document.getElementById('fileLabel');
    const uploadButton = document.getElementById('uploadButton');
    const progressElement = document.getElementById('uploadProgress');
    const loader = document.getElementById('loader');
    const resultParagraph = document.getElementById('result');

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
        resultParagraph.style.color = 'green' 
        resultParagraph.textContent = 'Enviado com sucesso!';
        progressElement.value = 100;
    } 
    catch(error) { 
        console.log("Error", error); 
        progressElement.hidden = true;
        resultParagraph.style.color = 'red'
        resultParagraph.textContent = 'Um erro ocorreu. Por favor, tente novamente.';
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