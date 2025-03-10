document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    const form = document.getElementById('upload-form');
    
    // Display selected files
    fileInput.addEventListener('change', function() {
        fileList.innerHTML = '';
        
        if (this.files.length > 0) {
            const fileCount = document.createElement('p');
            fileCount.textContent = `${this.files.length} file(s) selected:`;
            fileList.appendChild(fileCount);
            
            const list = document.createElement('ul');
            
            for (let i = 0; i < this.files.length; i++) {
                const file = this.files[i];
                const listItem = document.createElement('li');
                
                // Check if file is CSV or XLSX
                const extension = file.name.split('.').pop().toLowerCase();
                if (extension !== 'csv' && extension !== 'xlsx') {
                    listItem.className = 'invalid-file';
                    listItem.textContent = `${file.name} (Invalid file type)`;
                } else {
                    listItem.textContent = `${file.name}`;
                }
                
                list.appendChild(listItem);
            }
            
            fileList.appendChild(list);
        }
    });
    
    // Add drag and drop functionality
    const dropArea = document.querySelector('.file-input-container');
    
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });
    
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    
    ['dragenter', 'dragover'].forEach(eventName => {
        dropArea.addEventListener(eventName, highlight, false);
    });
    
    ['dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, unhighlight, false);
    });
    
    function highlight() {
        dropArea.classList.add('highlight');
    }
    
    function unhighlight() {
        dropArea.classList.remove('highlight');
    }
    
    dropArea.addEventListener('drop', handleDrop, false);
    
    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        fileInput.files = files;
        
        // Trigger change event
        const event = new Event('change');
        fileInput.dispatchEvent(event);
    }
    
    // Show loading indicator on form submit
    form.addEventListener('submit', function(e) {
        // Check if files are selected
        const files = fileInput.files;
        if (files.length === 0) {
            e.preventDefault();
            alert('Please select at least one file.');
            return;
        }
        
        // Create and show a loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = `
            <div class="spinner"></div>
            <p>Generating college statistics...</p>
            <p class="small">Please wait while files are being processed</p>
        `;
        
        // Insert after the form
        this.parentNode.insertBefore(loadingIndicator, this.nextSibling);
    });
});