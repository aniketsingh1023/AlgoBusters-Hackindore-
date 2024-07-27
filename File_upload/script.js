document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally
    
    // Get form data
    const formData = new FormData(this);
    
    // Optional: You can handle the form data here or send it via AJAX
    console.log('Form submitted');
    
    // Example of how you might handle the file upload and other data
    for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
    }
    
    // Optionally, you can send this data to a server here using fetch or XMLHttpRequest
});

