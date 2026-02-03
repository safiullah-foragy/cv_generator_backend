#!/bin/bash

# Test CV Generation API
# Make sure the server is running on http://localhost:5000

echo "Testing CV Generator Backend API..."
echo "==================================="

# Test endpoint
ENDPOINT="http://localhost:5000/api/cv/generate"

# Make POST request with form data
curl -X POST $ENDPOINT \
  -F "name=Ahmed Hassan" \
  -F "fathersName=Mohammad Hassan" \
  -F "mothersName=Fatima Hassan" \
  -F "presentAddress=House 45, Road 12, Dhanmondi, Dhaka-1209" \
  -F "permanentAddress=Village: Rampur, Post: Jalalpur, District: Gazipur" \
  -F "dateOfBirth=1996-08-20" \
  -F "age=29" \
  -F "gender=Male" \
  -F "maritalStatus=Married" \
  -F "nationality=Bangladeshi" \
  -F "gmail=ahmed.hassan@gmail.com" \
  -F "contactNumber=+880 1712-345678" \
  -F "sscGPA=5.00" \
  -F "sscSchool=Dhaka Residential Model College" \
  -F "sscBoard=Dhaka" \
  -F "hscGPA=5.00" \
  -F "hscCollege=Notre Dame College" \
  -F "hscBoard=Dhaka" \
  -F "graduationSubject=Computer Science & Engineering" \
  -F "graduationCGPA=3.85" \
  -F "graduationInstitution=Bangladesh University of Engineering and Technology (BUET)" \
  -F "currentJob=Senior Full Stack Developer at Tech Innovations Ltd." \
  -F 'previousJobs=[{"position":"Full Stack Developer","company":"Digital Solutions Bangladesh","duration":"January 2020 - December 2023"},{"position":"Junior Software Engineer","company":"CodeCraft Technologies","duration":"March 2019 - December 2019"}]' \
  -F "skills=JavaScript, TypeScript, React.js, Node.js, Express.js, MongoDB, PostgreSQL, Docker, AWS" \
  -F "languages=Bengali (Native), English (Fluent), Hindi (Intermediate)" \
  -F "hobbies=Web Development, Cricket, Traveling, Photography" \
  | jq '.'

echo ""
echo "==================================="
echo "Test completed!"
