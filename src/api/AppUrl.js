class AppUrl {
  static BaseUrl = 'http://127.0.0.1:8000/api';
  // Home url
  static HomeTopTitle = this.BaseUrl + '/home/title';
  static HomeTechnical = this.BaseUrl + '/home/technical';
  static HomeTotal = this.BaseUrl + '/home/total';
  static HomeVideo = this.BaseUrl + '/home/video';
  // Project url
  static ProjectHome = this.BaseUrl + '/project-home';
  static ProjectAll = this.BaseUrl + '/project-all';
  static ProjectDetails = this.BaseUrl + '/project-details';
  // Services url
  static Services = this.BaseUrl + '/services';
  // Information url
  static Information = this.BaseUrl + '/information';
  // Footer url
  static FooterData = this.BaseUrl + '/footer-data';
  // Course url
  static CourseHome = this.BaseUrl + '/course-home';
  static CourseAll = this.BaseUrl + '/course-all';
  static CourseDetails = this.BaseUrl + '/course-details/';
  // Contact form url
  static ContactSend = this.BaseUrl + '/contact-send';
  // Client url
  static ClientReview = this.BaseUrl + '/client-review';
  // Chart url
  static ChartData = this.BaseUrl + '/chart-data';
  // Test url
  static TestData = this.BaseUrl + '/tests/';
  static GetTestResult = this.BaseUrl + '/tests-result/';
  // Payment url
  static Payment = this.BaseUrl + '/payment/';
  //Authentication
  static Login = this.BaseUrl + '/login';
  static getUserLogin = this.BaseUrl + '/user-login';

  //Teacher
  //Course
  static teacherGetCourse = this.BaseUrl + '/get-course-teacher';
  static teacherPostCourse = this.BaseUrl + '/post-course-teacher';
  static DeleteCourse = this.BaseUrl + '/delete-course-teacher';
  static UpdateCourse = this.BaseUrl + '/update-course-teacher/';

  //Test
  static teacherGetTests = this.BaseUrl + '/get-tests-teacher/';
  static teacherPostTests = this.BaseUrl + '/post-tests-teacher/';
  static DeleteTest = this.BaseUrl + '/delete-tests-teacher/';
  static UpdateTest = this.BaseUrl + '/update-tests-teacher/';

  //Questions
  static getQuestions = this.BaseUrl + '/get-questions-teacher/';
  static postQuestion = this.BaseUrl + '/post-questions-teacher';
  static getQuestionDetail = this.BaseUrl + '/get-question-detail/';
  static updateQuestion = this.BaseUrl + '/update-questions-teacher/';
  static deleteQuestion = this.BaseUrl + '/delete-questions-teacher/';

  //Lesson student 
  static getLessonOfStudent = this.BaseUrl + '/get-lessons-student/'
  static updateLessonOfStudent = this.BaseUrl + '/update-lessons-student/'

  //Comments
  static getComments = this.BaseUrl + '/get-comments-lesson/'
  static postComments = this.BaseUrl + '/post-comments-lesson/'
  static putComments = this.BaseUrl + '/put-comments-lesson/'
  static deleteComments = this.BaseUrl + '/delete-comments-lesson/'

}

export default AppUrl;
