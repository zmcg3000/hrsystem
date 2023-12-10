// Function to fetch and transform employee data
export const fetchEmployeeData = async (employeeId) => {
    try {
        // Fetching employee details from the server
        const employeeResponse = await fetch(`https://2642-180-150-7-92.ngrok-free.app/people/${employeeId}`);
        if (!employeeResponse.ok) {
            // Handling response errors
            const errorText = await employeeResponse.text();
            // Log the error response
            console.error('Error response text:', errorText);
            throw new Error(`HTTP error on employee fetch! Status: ${employeeResponse.status}`);
        }
        const employeeData = await employeeResponse.json();

        // Fetching department details
        const departmentResponse = await fetch(`https://2642-180-150-7-92.ngrok-free.app/departments`);
        if (!departmentResponse.ok) {
            // Handling response errors
            const errorText = await departmentResponse.text();
            // Log the error response
            console.error('Error response text:', errorText);
            throw new Error(`HTTP error on department fetch! Status: ${departmentResponse.status}`);
        }
        const departmentData = await departmentResponse.json();

        // Transforming the employee data using the fetched department data
        return transformEmployeeData(employeeData, departmentData);
    } catch (error) {
        // Handling and re-throwing errors to the caller
        console.error('Error fetching employee or department data:', error);
        throw error;
    }
};

// Function to transform the raw employee data into a more usable format
const transformEmployeeData = (employeeData, departmentData) => {
    // Validating the employee data structure
    console.log('Transforming employee data:', employeeData);
    console.log('Available department data:', departmentData);

    // Validate the employee data
    if (!employeeData || typeof employeeData !== 'object') {
        console.error('Invalid employee data format for transformation:', employeeData);
        return null;
    }

    // Finding the department name corresponding to the employee's department ID
    const departmentName = departmentData.find(dept => dept.Id === employeeData.DepartmentId)?.Name || 'Unknown';

    // Constructing the final employee data object
    const transformedData = {
        StaffId: parseInt(employeeData.Id, 10), // Ensure Id is an integer
        Name: employeeData.Name,
        Phone: employeeData.Phone,
        Department: departmentName, // Use the department's name instead of the ID
        Address: {
            // Handling potentially missing address fields
            Street: employeeData.Address?.Street || 'N/A',
            City: employeeData.Address?.City || 'N/A',
            State: employeeData.Address?.State || 'N/A',
            ZIP: employeeData.Address?.ZIP || 'N/A',
            Country: employeeData.Address?.Country || 'N/A'
        }
    };

    // Log the output for verification
    console.log('Transformed employee data:', transformedData);

    return transformedData;
};

export default fetchEmployeeData;