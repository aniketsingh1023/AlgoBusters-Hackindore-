function generateCertificate() {
    const childName = document.getElementById('child-name').value;
    const dob = document.getElementById('dob').value;
    const add = document.getElementById('add').value;
    const placeOfBirth = document.getElementById('place-of-birth').value;
    const gender = document.getElementById('gender').value;
    const fatherName = document.getElementById('father-name').value;
    const motherName = document.getElementById('mother-name').value;
    const registrationNumber = document.getElementById('registration-number').value;
    const registrationDate = document.getElementById('registration-date').value;

    const certificateContent = `
        Leagal Information
        
        Person's Information:
        Full Name: ${childName}
        Date of Birth: ${dob}
        Place of Birth: ${placeOfBirth}
        Gender: ${gender}
        Address: ${add}

        Parent's Information:
        Father's Full Name: ${fatherName}
        Mother's Full Name: ${motherName}

        Registration Details:
        Registration Number: ${registrationNumber}
        Date of Registration: ${registrationDate}
    `;

    document.getElementById('certificate-content').textContent = certificateContent;
    document.getElementById('certificate-output').style.display = 'block';
}
