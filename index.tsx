import React, { useState } from 'react';
import { X, Plus, Award, GraduationCap, BookOpen, Calculator } from 'lucide-react';

// Course data organized by department
const COURSES = {
  theology: [
    { name: 'Freshman Theology', credits: 10, grade: 9 },
    { name: 'Sophomore Theology', credits: 10, grade: 10 },
    { name: 'Junior Theology', credits: 10, grade: 11 },
    { name: 'Senior Theology', credits: 10, grade: 12 },
  ],
  english: [
    { name: 'English I', credits: 10, grade: 9 },
    { name: 'English II', credits: 10, grade: 10 },
    { name: 'English III', credits: 10, grade: 11 },
    { name: 'College Prep Writing S1', credits: 5, grade: 12, dualCredit: 3 },
    { name: 'College Prep Writing S2', credits: 5, grade: 12, dualCredit: 3 },
    { name: 'AP English Literature', credits: 10, grade: 12, ap: true, dualCredit: 3 },
    { name: 'Classic Lit I', credits: 10, grade: 11, dualCredit: 3 },
    { name: 'Classic Lit II', credits: 10, grade: 12, dualCredit: 3 },
  ],
  socialStudies: [
    { name: 'World Geography', credits: 5, grade: 9 },
    { name: 'World History', credits: 10, grade: 10 },
    { name: 'US History', credits: 10, grade: 11 },
    { name: 'AP Human Geography', credits: 10, grade: [10, 11, 12], ap: true },
    { name: 'AP American Government', credits: 5, grade: 12, ap: true },
    { name: 'Economics', credits: 5, grade: 12 },
  ],
  math: [
    { name: 'Algebra I', credits: 10, grade: 9 },
    { name: 'Geometry', credits: 10, grade: [9, 10] },
    { name: 'Algebra II', credits: 10, grade: [10, 11] },
    { name: 'Pre-Calculus', credits: 10, grade: [11, 12] },
    { name: 'AP Calculus AB', credits: 10, grade: [11, 12], ap: true, dualCredit: 5 },
    { name: 'AP Calculus (PACE)', credits: 10, grade: 12, ap: true, dualCredit: 10 },
    { name: 'AP Statistics', credits: 10, grade: [11, 12], ap: true, dualCredit: 3 },
  ],
  science: [
    { name: 'Physical Science', credits: 10, grade: 9 },
    { name: 'Biology', credits: 10, grade: 10 },
    { name: 'Chemistry', credits: 10, grade: 11 },
    { name: 'AP Biology', credits: 10, grade: 12, ap: true, dualCredit: 4 },
    { name: 'AP Environmental Science', credits: 10, grade: [11, 12], ap: true },
    { name: 'AP Physics (PACE)', credits: 10, grade: 12, ap: true, dualCredit: 8 },
    { name: 'Anatomy & Physiology', credits: 10, grade: [11, 12] },
  ],
  speech: [
    { name: 'Speech', credits: 5, grade: [9, 10, 11, 12] },
  ],
  pe: [
    { name: 'PE 9', credits: 5, grade: 9 },
    { name: 'PE 10', credits: 5, grade: 10 },
    { name: 'PE 11', credits: 5, grade: 11 },
  ],
  fineArts: [
    { name: 'Art I', credits: 5, grade: [9, 10, 11, 12] },
    { name: 'AP Art History', credits: 10, grade: [10, 11, 12], ap: true },
    { name: 'Concert Choir', credits: 5, grade: [9, 10, 11, 12] },
    { name: 'Band', credits: 5, grade: [9, 10, 11, 12] },
    { name: 'Theater I', credits: 5, grade: [9, 10, 11, 12] },
  ],
  lifeSkills: [
    { name: 'Life Skills', credits: 5, grade: [9, 10, 11, 12] },
  ],
  languages: [
    { name: 'Spanish I', credits: 10, grade: [9, 10, 11, 12] },
    { name: 'Spanish II', credits: 10, grade: [9, 10, 11, 12] },
    { name: 'Spanish III', credits: 10, grade: [10, 11, 12] },
    { name: 'Spanish IV', credits: 10, grade: [11, 12], dualCredit: 4 },
  ],
  business: [
    { name: 'Introduction to Business', credits: 5, grade: [9, 10, 11, 12] },
    { name: 'Accounting', credits: 10, grade: [10, 11, 12] },
    { name: 'Marketing', credits: 5, grade: [10, 11, 12] },
  ],
  industrialTech: [
    { name: 'Woods I', credits: 5, grade: [9, 10, 11, 12] },
    { name: 'Metals I', credits: 5, grade: [9, 10, 11, 12] },
    { name: 'Drafting', credits: 5, grade: [9, 10, 11, 12] },
  ],
  fcs: [
    { name: 'Foods I', credits: 5, grade: [9, 10, 11, 12] },
    { name: 'Child Development', credits: 5, grade: [10, 11, 12] },
    { name: 'Fashion & Design', credits: 5, grade: [9, 10, 11, 12] },
  ],
};

const REQUIREMENTS = {
  theology: 40,
  english: 40,
  socialStudies: 35,
  math: 30,
  science: 30,
  speech: 5,
  pe: 15,
  fineArts: 5,
  lifeSkills: 5,
};

const DEPARTMENT_NAMES = {
  theology: 'Theology',
  english: 'English',
  socialStudies: 'Social Studies',
  math: 'Math',
  science: 'Science',
  speech: 'Speech',
  pe: 'Physical Education',
  fineArts: 'Fine Arts',
  lifeSkills: 'Life Skills',
  languages: 'Languages (Elective)',
  business: 'Business (Elective)',
  industrialTech: 'Industrial Technology (Elective)',
  fcs: 'Family & Consumer Sciences (Elective)',
};

const GRADE_POINTS = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

function CoursePlanner() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const allCourses = Object.entries(COURSES).flatMap(([dept, courses]) =>
    courses.map(c => ({ ...c, department: dept }))
  );

  const calculateProgress = () => {
    const progress = {};
    Object.keys(REQUIREMENTS).forEach(dept => {
      const earned = selectedCourses
        .filter(c => c.department === dept && c.completed)
        .reduce((sum, c) => sum + c.credits, 0);
      progress[dept] = {
        earned,
        required: REQUIREMENTS[dept],
        percentage: (earned / REQUIREMENTS[dept]) * 100,
      };
    });
    return progress;
  };

  const calculateTotals = () => {
    let apCredits = 0;
    let dualCredits = 0;
    
    selectedCourses.forEach(course => {
      if (course.ap) apCredits += 1;
      if (course.dualCredit) dualCredits += course.dualCredit;
    });
    
    return { apCredits, dualCredits };
  };

  const calculateGPA = () => {
    const completedCourses = selectedCourses.filter(c => c.completed && c.letterGrade);
    if (completedCourses.length === 0) return 0;
    
    const totalPoints = completedCourses.reduce((sum, c) => {
      return sum + (GRADE_POINTS[c.letterGrade] || 0);
    }, 0);
    
    return (totalPoints / completedCourses.length).toFixed(2);
  };

  const toggleCourse = (course) => {
    const exists = selectedCourses.find(c => c.name === course.name);
    if (exists) {
      setSelectedCourses(selectedCourses.filter(c => c.name !== course.name));
    } else {
      setSelectedCourses([...selectedCourses, { 
        ...course, 
        year: 9,
        semester: 'Fall',
        completed: false,
        letterGrade: null
      }]);
    }
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setShowModal(true);
  };

  const saveEditedCourse = () => {
    setSelectedCourses(selectedCourses.map(c => 
      c.name === editingCourse.name ? editingCourse : c
    ));
    setShowModal(false);
    setEditingCourse(null);
  };

  const progress = calculateProgress();
  const totals = calculateTotals();
  const totalCredits = selectedCourses.filter(c => c.completed).reduce((sum, c) => sum + c.credits, 0);
  const gpa = calculateGPA();

  const filteredCourses = filter === 'all' 
    ? allCourses 
    : allCourses.filter(c => c.department === filter);

  const groupedByYearSemester = selectedCourses.reduce((acc, course) => {
    const key = `${course.year}-${course.semester}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(course);
    return acc;
  }, {});

  const yearLabels = { 9: 'Freshman', 10: 'Sophomore', 11: 'Junior', 12: 'Senior' };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header matching piusx.net style */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-white" style={{ backgroundColor: '#046a38' }}>
                P
              </div>
              <div>
                <h1 className="font-bold text-gray-900" style={{ fontFamily: 'Century Gothic, sans-serif', fontSize: '20px' }}>
                  PIUS X CATHOLIC HIGH SCHOOL
                </h1>
                <p className="text-sm text-gray-600" style={{ fontFamily: 'Minion Pro, serif' }}>
                  Course Planning Tool
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow p-4 text-center border-t-4" style={{ borderColor: '#046a38' }}>
            <div className="text-3xl font-bold" style={{ color: '#046a38' }}>{totalCredits}</div>
            <div className="text-sm text-gray-600 mt-1">Credits Earned</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center border-t-4 border-blue-500">
            <div className="text-3xl font-bold text-blue-800">{totals.apCredits}</div>
            <div className="text-sm text-gray-600 mt-1">AP Courses</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center border-t-4 border-purple-500">
            <div className="text-3xl font-bold text-purple-800">{totals.dualCredits}</div>
            <div className="text-sm text-gray-600 mt-1">College Credits</div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 text-center border-t-4" style={{ borderColor: '#ffd100' }}>
            <div className="text-3xl font-bold" style={{ color: '#046a38' }}>{gpa}</div>
            <div className="text-sm text-gray-600 mt-1">GPA (Unweighted)</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Course Selection */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#046a38' }}>
              <BookOpen className="w-6 h-6" />
              Available Courses
            </h3>

            <div className="mb-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
                style={{ focusRingColor: '#046a38' }}
              >
                <option value="all">All Departments</option>
                {Object.entries(DEPARTMENT_NAMES).map(([key, name]) => (
                  <option key={key} value={key}>{name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredCourses.map((course, idx) => {
                const isSelected = selectedCourses.find(c => c.name === course.name);
                return (
                  <div
                    key={idx}
                    onClick={() => toggleCourse(course)}
                    className={`p-3 rounded border-2 cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-green-50'
                        : 'border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                    style={isSelected ? { borderColor: '#046a38' } : {}}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="font-semibold text-gray-800 flex items-center gap-2">
                          {course.name}
                          {course.ap && (
                            <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">AP</span>
                          )}
                          {course.dualCredit && (
                            <span className="text-xs bg-purple-500 text-white px-2 py-0.5 rounded">
                              DC: {course.dualCredit}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600">
                          {DEPARTMENT_NAMES[course.department]} • {course.credits} credits
                        </div>
                      </div>
                      <div>
                        {isSelected ? (
                          <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#046a38' }}>
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        ) : (
                          <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Graduation Requirements */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2" style={{ color: '#046a38' }}>
              <Award className="w-6 h-6" />
              Requirements
            </h3>

            <div className="space-y-4">
              {Object.entries(REQUIREMENTS).map(([dept, required]) => {
                const prog = progress[dept];
                const isComplete = prog.earned >= required;
                
                return (
                  <div key={dept} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-gray-700">
                        {DEPARTMENT_NAMES[dept]}
                      </span>
                      <span className={`font-semibold ${isComplete ? 'text-green-600' : 'text-gray-600'}`}>
                        {prog.earned}/{required}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{ 
                          width: `${Math.min(prog.percentage, 100)}%`,
                          backgroundColor: isComplete ? '#046a38' : '#ffd100'
                        }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 rounded border-2" style={{ backgroundColor: '#f0f9f4', borderColor: '#046a38' }}>
              <div className="text-sm text-gray-700">
                <strong>Total Required:</strong> 205 credits
              </div>
              <div className="text-sm text-gray-700 mt-1">
                <strong>Your Progress:</strong> {totalCredits} credits
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                <div
                  className="h-3 rounded-full transition-all"
                  style={{ 
                    width: `${Math.min((totalCredits / 205) * 100, 100)}%`,
                    backgroundColor: '#046a38'
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Courses by Year/Semester */}
        {selectedCourses.length > 0 && (
          <div className="mt-6 bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-bold mb-4" style={{ color: '#046a38' }}>
              Your Selected Courses ({selectedCourses.length})
            </h3>
            
            {[9, 10, 11, 12].map(year => (
              <div key={year} className="mb-6">
                <h4 className="text-lg font-bold mb-3 pb-2 border-b-2" style={{ color: '#046a38', borderColor: '#ffd100' }}>
                  {yearLabels[year]} Year
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Fall', 'Spring'].map(semester => {
                    const courses = groupedByYearSemester[`${year}-${semester}`] || [];
                    return (
                      <div key={semester} className="border rounded p-3" style={{ borderColor: '#046a38' }}>
                        <h5 className="font-semibold text-sm mb-2" style={{ color: '#046a38' }}>
                          {semester} Semester
                        </h5>
                        {courses.length === 0 ? (
                          <p className="text-xs text-gray-400 italic">No courses scheduled</p>
                        ) : (
                          <div className="space-y-2">
                            {courses.map((course, idx) => (
                              <div 
                                key={idx} 
                                className="bg-gray-50 p-2 rounded text-xs cursor-pointer hover:bg-gray-100"
                                onClick={() => openEditModal(course)}
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex-1">
                                    <div className="font-semibold text-gray-800 flex items-center gap-1">
                                      {course.name}
                                      {course.completed && (
                                        <span className="text-green-600">✓</span>
                                      )}
                                    </div>
                                    <div className="text-gray-600">
                                      {course.credits} credits
                                      {course.completed && course.letterGrade && (
                                        <span className="ml-2 font-semibold" style={{ color: '#046a38' }}>
                                          Grade: {course.letterGrade}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && editingCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold" style={{ color: '#046a38' }}>Edit Course</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700">Course Name</label>
                <input 
                  type="text" 
                  value={editingCourse.name} 
                  disabled 
                  className="w-full p-2 border rounded bg-gray-100 text-gray-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Year</label>
                  <select
                    value={editingCourse.year}
                    onChange={(e) => setEditingCourse({...editingCourse, year: Number(e.target.value)})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2"
                    style={{ focusRingColor: '#046a38' }}
                  >
                    <option value={9}>Freshman</option>
                    <option value={10}>Sophomore</option>
                    <option value={11}>Junior</option>
                    <option value={12}>Senior</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Semester</label>
                  <select
                    value={editingCourse.semester}
                    onChange={(e) => setEditingCourse({...editingCourse, semester: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2"
                    style={{ focusRingColor: '#046a38' }}
                  >
                    <option value="Fall">Fall</option>
                    <option value="Spring">Spring</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editingCourse.completed}
                    onChange={(e) => setEditingCourse({
                      ...editingCourse, 
                      completed: e.target.checked,
                      letterGrade: e.target.checked ? editingCourse.letterGrade : null
                    })}
                    className="w-4 h-4"
                    style={{ accentColor: '#046a38' }}
                  />
                  <span className="text-sm font-semibold text-gray-700">Course Completed</span>
                </label>
              </div>

              {editingCourse.completed && (
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700">Letter Grade</label>
                  <select
                    value={editingCourse.letterGrade || ''}
                    onChange={(e) => setEditingCourse({...editingCourse, letterGrade: e.target.value})}
                    className="w-full p-2 border rounded focus:outline-none focus:ring-2"
                    style={{ focusRingColor: '#046a38' }}
                  >
                    <option value="">Select Grade</option>
                    {Object.keys(GRADE_POINTS).map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex gap-3 pt-4">
                <button
                  onClick={saveEditedCourse}
                  className="flex-1 text-white font-semibold py-2 px-4 rounded hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: '#046a38' }}
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CoursePlanner;