document.getElementById('send-file').addEventListener('click', () => {
    console.log('Send File clicked');
    // Add your logic here
});

document.getElementById('send-back').addEventListener('click', () => {
    console.log('Send Back clicked');
    // Add your logic here
});

document.getElementById('park').addEventListener('click', () => {
    console.log('Park clicked');
    // Add your logic here
});

document.getElementById('move-to').addEventListener('click', () => {
    console.log('Move To clicked');
    // Add your logic here
});

document.getElementById('file-create').addEventListener('click', () => {
    console.log('File Create clicked');
    // Add your logic here
});

document.getElementById('dispatched').addEventListener('click', () => {
    console.log('Dispatched clicked');
    // Add your logic here
});

document.getElementById('filter-options').addEventListener('change', (event) => {
    console.log('Filter option changed to:', event.target.value);
    // Add your logic here
});

document.getElementById('upload-document').addEventListener('click', () => {
    console.log('Upload Document clicked');
    // Add your logic here
});

document.getElementById('remove-document').addEventListener('click', () => {
    console.log('Remove Document clicked');
    // Add your logic here
});

function loadFiles() {
    // Fetch files from the server and populate the table
    fetch('/files')
        .then(response => response.json())
        .then(files => {
            const tableBody = document.querySelector('#files-table tbody');
            tableBody.innerHTML = ''; // Clear existing rows
            files.forEach(file => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${file.name}</td>
                    <td class="actions">
                        <button onclick="editFile('${file.name}')">Edit</button>
                        <button onclick="escalateFile('${file.name}')">Escalate</button>
                        <button onclick="shareFile('${file.name}')">Share</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

function editFile(filename) {
    console.log(`Edit ${filename} clicked`);
    // Add your logic here
}

function escalateFile(filename) {
    console.log(`Escalate ${filename} clicked`);
    // Add your logic here
}

function shareFile(filename) {
    console.log(`Share ${filename} clicked`);
    // Add your logic here
}

// Load files when the page loads
document.addEventListener('DOMContentLoaded', loadFiles);

// Function to handle form submission
document.getElementById('document-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('/create-document', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text())
    .then(result => {
        console.log(result);
        loadFiles(); // Reload files after form submission
    })
    .catch(error => console.error('Error:', error));
});

document.getElementById('document-type').addEventListener('change', (event) => {
    const formFields = document.getElementById('form-fields');
    formFields.innerHTML = ''; // Clear previous form fields
    const documentType = event.target.value;

    if (documentType === 'birth-certificate') {
        formFields.innerHTML = `
            <fieldset>
                <legend>Child's Information</legend>
                <label for="child-name">Full Name:</label>
                <input type="text" id="child-name" name="child-name" required>
                <label for="dob">Date of Birth:</label>
                <input type="date" id="dob" name="dob" required>
                <label for="gender">Gender:</label>
                <select id="gender" name="gender" required>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </fieldset>
            <fieldset>
                <legend>Parents' Information</legend>
                <label for="father-name">Father's Full Name:</label>
                <input type="text" id="father-name" name="father-name" required>
                <label for="mother-name">Mother's Full Name:</label>
                <input type="text" id="mother-name" name="mother-name" required>
                <label for="address">Address:</label>
                <textarea id="address" name="address" required></textarea>
            </fieldset>
        `;
    } else if (documentType === 'death-certificate') {
        formFields.innerHTML = `
            <label for="deceased-name">Full Name:</label>
            <input type="text" id="deceased-name" name="deceased-name" required>
            <label for="dod">Date of Death:</label>
            <input type="date" id="dod" name="dod" required>
            <label for="place-of-death">Place of Death:</label>
            <input type="text" id="place-of-death" name="place-of-death" required>
            <label for="cause-of-death">Cause of Death:</label>
            <textarea id="cause-of-death" name="cause-of-death" required></textarea>
        `;
    } else if (documentType === 'legal-agreement') {
        formFields.innerHTML = `
            <label for="parties-involved">Parties Involved:</label>
            <input type="text" id="parties-involved" name="parties-involved" required>
            <label for="agreement-details">Agreement Details:</label>
            <textarea id="agreement-details" name="agreement-details" required></textarea>
            <label for="date-of-agreement">Date of Agreement:</label>
            <input type="date" id="date-of-agreement" name="date-of-agreement" required>
        `;
    }
});

// Event listener for document form submission
document.getElementById('document-form').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const documentType = formData.get('documentType');

    if (documentType === 'birth-certificate') {
        const certificateData = {
            name: formData.get('child-name'),
            dateOfBirth: formData.get('dob'),
            gender: formData.get('gender'),
            fatherName: formData.get('father-name'),
            motherName: formData.get('mother-name'),
            address: formData.get('address')
        };

        const certificateContent = `
            Birth Certificate\n
            -------------------------\n
            Child's Name: ${certificateData.name}\n
            Date of Birth: ${certificateData.dateOfBirth}\n
            Gender: ${certificateData.gender}\n
            Father's Name: ${certificateData.fatherName}\n
            Mother's Name: ${certificateData.motherName}\n
            Address: ${certificateData.address}
        `;

        document.getElementById('certificate-content').textContent = certificateContent;
        document.getElementById('certificate-output').style.display = 'block';
    }

    // Handle other document types as needed
});
