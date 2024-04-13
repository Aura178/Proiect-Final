const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');

fileInput.addEventListener('change', function() {
    imagePreview.innerHTML = ''; 

    const files = this.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const image = new Image();
            image.src = e.target.result;
            image.classList.add('preview-image');
            imagePreview.appendChild(image);
        }

        reader.readAsDataURL(file);
    }
});

const uploadForm = document.getElementById('upload-form');
uploadForm.addEventListener('submit', function(event) {
    event.preventDefault(); 

    const formData = new FormData();
    const files = fileInput.files;

    for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
    }


    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            console.log('Imaginile au fost încărcate cu succes!');
           
        } else {
            console.error('Eroare la încărcarea imaginilor.');
        }
    })
    .catch(error => {
        console.error('Eroare la comunicarea cu serverul:', error);
    });
});




