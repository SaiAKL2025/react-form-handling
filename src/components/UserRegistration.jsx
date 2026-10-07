import { useState } from "react";
import "./UserRegistration.css";

const hobbies = [
  {
    value: "music",
    name: "Music",
  },
  {
    value: "movie",
    name: "Movies",
  },
  {
    value: "plastic-model",
    name: "Plastic Model",
  },
];

const genders = [
  {
    value: "male",
    name: "Male",
  },
  {
    value: "female",
    name: "Female",
  },
  {
    value: "others",
    name: "Others",
  },
];

// Department and Job Position
const departments = {
  Accounting: [
    "Accountant",
    "Senior Accountant",
    "Payroll Officer",
  ],
  IT: [
    "Frontend Developer",
    "Backend Developer",
    "System Analyst",
  ],
  HR: [
    "HR Officer",
    "Recruiter",
    "Training Officer",
  ],
  Marketing: [
    "Marketing Officer",
    "Content Creator",
    "SEO Specialist",
  ],
};

function UserRegistration() {

  const defaultDepartment = Object.keys(departments)[0];

  const [formData, setFormData] = useState({
    username: "",
    firstname: "",
    lastname: "",
    gender: "",
    hobbies: [],
    department: defaultDepartment,
    job: departments[defaultDepartment][0],
  });

  const [submittedData, setSubmittedData] = useState(null);

  // Handle text input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle Gender
  const handleGender = (e) => {
    setFormData({
      ...formData,
      gender: e.target.value,
    });
  };

  // Handle Hobbies
  const handleHobby = (e) => {

    const value = e.target.value;

    if (e.target.checked) {

      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, value],
      });

    } else {

      setFormData({
        ...formData,
        hobbies: formData.hobbies.filter(
          (item) => item !== value
        ),
      });

    }
  };

  // Handle Department
  const handleDepartment = (e) => {

    const department = e.target.value;

    setFormData({
      ...formData,
      department: department,
      job: departments[department][0],
    });

  };

  // Handle Job Position
  const handleJob = (e) => {

    setFormData({
      ...formData,
      job: e.target.value,
    });

  };

  // Submit
  const handleSubmit = (e) => {

    e.preventDefault();

    setSubmittedData(formData);

  };

  // Reset
  const handleReset = () => {

    setFormData({
      username: "",
      firstname: "",
      lastname: "",
      gender: "",
      hobbies: [],
      department: defaultDepartment,
      job: departments[defaultDepartment][0],
    });

    setSubmittedData(null);

  };

  return (
    <div className="user-registration">

      <h2>User Registration</h2>

      <hr />

      <form onSubmit={handleSubmit}>
                {/* Username */}
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        {/* Firstname */}
        <div className="form-group">
          <label>Firstname</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>

        {/* Lastname */}
        <div className="form-group">
          <label>Lastname</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>

        {/* Gender */}
        <div className="form-group">
          <label>Gender</label>

          <div className="radio-group">
            {genders.map((gender) => (
              <label key={gender.value}>
                <input
                  type="radio"
                  name="gender"
                  value={gender.value}
                  checked={formData.gender === gender.value}
                  onChange={handleGender}
                />
                {gender.name}
              </label>
            ))}
          </div>
        </div>

        {/* Hobbies */}
        <div className="form-group">
          <label>Hobbies</label>

          <div className="checkbox-group">
            {hobbies.map((hobby) => (
              <label key={hobby.value}>
                <input
                  type="checkbox"
                  value={hobby.value}
                  checked={formData.hobbies.includes(hobby.value)}
                  onChange={handleHobby}
                />
                {hobby.name}
              </label>
            ))}
          </div>
        </div>

        {/* Department */}
        <div className="form-group">
          <label>Department</label>

          <select
            name="department"
            value={formData.department}
            onChange={handleDepartment}
          >
            {Object.keys(departments).map((department) => (
              <option
                key={department}
                value={department}
              >
                {department}
              </option>
            ))}
          </select>
        </div>

        {/* Job Position */}
        <div className="form-group">
          <label>Job Position</label>

          <select
            name="job"
            value={formData.job}
            onChange={handleJob}
          >
            {departments[formData.department].map((job) => (
              <option
                key={job}
                value={job}
              >
                {job}
              </option>
            ))}
          </select>
        </div>

        <hr />

        <div className="button-group">
          <button
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>

          <button type="submit">
            Submit
          </button>
          
        </div>
              </form>

      {submittedData && (
        <>
          <hr />

          <h3>Submitted Information</h3>

          <table
            border="1"
            cellPadding="8"
            style={{
              borderCollapse: "collapse",
              marginTop: "20px",
              width: "100%",
            }}
          >
            <tbody>
              <tr>
                <td><strong>Username</strong></td>
                <td>{submittedData.username}</td>
              </tr>

              <tr>
                <td><strong>Firstname</strong></td>
                <td>{submittedData.firstname}</td>
              </tr>

              <tr>
                <td><strong>Lastname</strong></td>
                <td>{submittedData.lastname}</td>
              </tr>

              <tr>
                <td><strong>Gender</strong></td>
                <td>{submittedData.gender}</td>
              </tr>

              <tr>
                <td><strong>Hobbies</strong></td>
                <td>
                  {submittedData.hobbies.length > 0
                    ? submittedData.hobbies.join(", ")
                    : "None"}
                </td>
              </tr>

              <tr>
                <td><strong>Department</strong></td>
                <td>{submittedData.department}</td>
              </tr>

              <tr>
                <td><strong>Job Position</strong></td>
                <td>{submittedData.job}</td>
              </tr>
            </tbody>
          </table>
        </>
      )}

    </div>
  );
}

export default UserRegistration;