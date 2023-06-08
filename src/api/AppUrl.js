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
  // Payment url
  static Payment = this.BaseUrl + '/payment/';
  //Authentication
  static Login = this.BaseUrl + '/login';
  static getUserLogin = this.BaseUrl + '/user-login';

  //Teacher
  static teacherGetCourse = this.BaseUrl + '/get-course-teacher';
  static teacherPostCourse = this.BaseUrl + '/post-course-teacher';
}

export default AppUrl;
