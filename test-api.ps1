# Test CV Generation API (PowerShell)
# Make sure the server is running on http://localhost:5000

Write-Host "Testing CV Generator Backend API..." -ForegroundColor Green
Write-Host "===================================" -ForegroundColor Green

# Test endpoint
$endpoint = "http://localhost:5000/api/cv/generate"

# Prepare form data
$formData = @{
    name = "Ahmed Hassan"
    fathersName = "Mohammad Hassan"
    mothersName = "Fatima Hassan"
    presentAddress = "House 45, Road 12, Dhanmondi, Dhaka-1209"
    permanentAddress = "Village: Rampur, Post: Jalalpur, District: Gazipur"
    dateOfBirth = "1996-08-20"
    age = "29"
    gender = "Male"
    maritalStatus = "Married"
    nationality = "Bangladeshi"
    gmail = "ahmed.hassan@gmail.com"
    contactNumber = "+880 1712-345678"
    sscGPA = "5.00"
    sscSchool = "Dhaka Residential Model College"
    sscBoard = "Dhaka"
    hscGPA = "5.00"
    hscCollege = "Notre Dame College"
    hscBoard = "Dhaka"
    graduationSubject = "Computer Science & Engineering"
    graduationCGPA = "3.85"
    graduationInstitution = "Bangladesh University of Engineering and Technology (BUET)"
    currentJob = "Senior Full Stack Developer at Tech Innovations Ltd."
    previousJobs = '[{"position":"Full Stack Developer","company":"Digital Solutions Bangladesh","duration":"January 2020 - December 2023"},{"position":"Junior Software Engineer","company":"CodeCraft Technologies","duration":"March 2019 - December 2019"}]'
    skills = "JavaScript, TypeScript, React.js, Node.js, Express.js, MongoDB, PostgreSQL, Docker, AWS"
    languages = "Bengali (Native), English (Fluent), Hindi (Intermediate)"
    hobbies = "Web Development, Cricket, Traveling, Photography"
}

try {
    # Make POST request
    $response = Invoke-RestMethod -Uri $endpoint -Method Post -Form $formData
    
    Write-Host ""
    Write-Host "Success! Response:" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 10
    
    Write-Host ""
    Write-Host "Session ID: $($response.sessionId)" -ForegroundColor Cyan
    Write-Host "Generated CVs: $($response.cvs.Count)" -ForegroundColor Cyan
    
    Write-Host ""
    Write-Host "Available Templates:" -ForegroundColor Yellow
    foreach ($cv in $response.cvs) {
        Write-Host "  Template $($cv.templateId): $($cv.templateName)" -ForegroundColor White
        Write-Host "    PDF: $($cv.pdf.downloadUrl)" -ForegroundColor Gray
        Write-Host "    DOCX: $($cv.docx.downloadUrl)" -ForegroundColor Gray
    }
    
} catch {
    Write-Host ""
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "===================================" -ForegroundColor Green
Write-Host "Test completed!" -ForegroundColor Green
