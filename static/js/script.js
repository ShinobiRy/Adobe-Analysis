document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('file-input');
    const fileList = document.getElementById('file-list');
    const form = document.getElementById('upload-form');
    if (form) form.reset();  // Reset the form to clear inputs
    
    // Display selected files
    fileInput.addEventListener('change', function() {
        fileList.innerHTML = ''; // Clear previous entries, including errors
        
        if (this.files.length > 0) {
            fileList.innerHTML = ''; // Clear previous errors/messages
        
            // Create file count text
            const fileCount = document.createElement('p');
            fileCount.innerHTML = `<strong>${this.files.length} file selected:</strong>`;
            fileList.appendChild(fileCount);
        
            const list = document.createElement('ul');
            let hasInvalidFile = false;
            let invalidFiles = [];
        
            for (let i = 0; i < this.files.length; i++) {
                const file = this.files[i];
                const listItem = document.createElement('li');
        
                // Extract file details
                const fileName = file.name;
                const fileSize = (file.size / 1024).toFixed(2); // Convert to KB
                const extension = fileName.split('.').pop().toLowerCase();
        
                // Format file size
                let formattedSize = fileSize < 1024 
                    ? `${fileSize} KB` 
                    : `${(fileSize / 1024).toFixed(2)} MB`;
        
                // Check file type
                if (extension !== 'csv' && extension !== 'xlsx') {
                    hasInvalidFile = true;
                    invalidFiles.push(fileName);
                    
                    listItem.className = 'invalid-file';
                    listItem.innerHTML = `<span class="error-icon"><i class="fas fa-times-circle"></i></span> 
                        <strong>${fileName}</strong> <span>(Invalid file type)</span>`;
                } else {
                    listItem.innerHTML = `<span class="file-icon">📄</span> 
                        <strong>${fileName}</strong> 
                        <span style="color: #fffff7;">(${formattedSize})</span>`;
                }
        
                list.appendChild(listItem);
            }
        
            fileList.appendChild(list);
            fileList.style.display = 'block'; // Show the file list
        
            // Show alert if there are invalid files
            if (hasInvalidFile) {
                if (invalidFiles.length === 1) {
                    alert(`"${invalidFiles[0]}" is an invalid file type. Only CSV and XLSX files are allowed.`);
                } else {
                    alert(`Invalid file types detected. Only CSV and XLSX files are allowed.\nInvalid files: ${invalidFiles.join(', ')}`);
                }
            }
        } else {
            fileList.style.display = 'none';
        }
    });
    
    
    // Add drag and drop functionality
    const dropArea = document.querySelector('.file-input-container');
    
    // Trigger file input when clicking the drop area
    dropArea.addEventListener('click', function() {
        fileInput.click();
    });

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
        
        // Validate file types
        let hasInvalidFile = false;
        let invalidFiles = [];
        
        for (let i = 0; i < files.length; i++) {
            const extension = files[i].name.split('.').pop().toLowerCase();
            if (extension !== 'csv' && extension !== 'xlsx') {
                hasInvalidFile = true;
                invalidFiles.push(files[i].name);
            }
        }
        
        if (hasInvalidFile) {
            e.preventDefault();
            if (invalidFiles.length === 1) {
                alert(`"${invalidFiles[0]}" is an invalid file type. Only CSV and XLSX files are allowed.`);
            } else {
                alert(`Invalid file types detected. Only CSV and XLSX files are allowed.\nInvalid files: ${invalidFiles.join(', ')}`);
            }
            return;
        }
        
        // Note: Removed success alert - let the backend handle validation and confirmation
        
        // Create and show a loading indicator
        const loadingIndicator = document.createElement('div');
        loadingIndicator.className = 'loading-indicator';
        loadingIndicator.innerHTML = `
            <div class="spinner"></div>
            <di class = "loading-text">
                <p>Generating college statistics...</p>
                <p class = "sub">Please wait while your files are being processed. This may take a few minutes depending on file size.</p>
            </div>
        `;
        
        // Insert after the form
        this.parentNode.insertBefore(loadingIndicator, this.nextSibling);
        
        // Disable the submit button to prevent multiple submissions
        const submitBtn = this.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Processing...';
    });
});