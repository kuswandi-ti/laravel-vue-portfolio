<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta content="width=device-width, initial-scale=1.0" name="viewport">

    <title>Portfolio Website - Kuswandi</title>
    <meta content="" name="description">
    <meta content="" name="keywords">

    <!-- Favicons -->
    <link href="{{ asset('assets/img/favicon.png') }}" rel="icon">
    <link href="{{ asset('assets/img/apple-touch-icon.png') }}" rel="apple-touch-icon">

    <!-- Google Fonts -->
    <link
        href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Raleway:300,300i,400,400i,500,500i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i"
        rel="stylesheet">

    <!-- Vendor CSS Files -->
    <link href="{{ asset('assets/vendor/aos/aos.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/vendor/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/vendor/boxicons/css/boxicons.min.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/vendor/glightbox/css/glightbox.min.css') }}" rel="stylesheet">
    <link href="{{ asset('assets/vendor/swiper/swiper-bundle.min.css') }}" rel="stylesheet">

    <!-- Template Main CSS File -->
    <link href="{{ asset('assets/css/style.css') }}" rel="stylesheet">

    <!-- =======================================================
  * Template Name: iPortfolio
  * Updated: May 30 2023 with Bootstrap v5.3.0
  * Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
  * Author: BootstrapMade.com
  * License: https://bootstrapmade.com/license/
  ======================================================== -->
</head>

<body>

    <!-- ======= Mobile nav toggle button ======= -->
    <i class="bi bi-list mobile-nav-toggle d-xl-none"></i>

    <!-- ======= Header ======= -->
    <header id="header">
        <div class="d-flex flex-column">

            <div class="profile">
                <img src="{{ !empty($about->photo) ? asset('admin/'.$about->photo) : '' }}" alt=""
                    class="img-fluid rounded-circle">
                <h1 class="text-light"><a href="/"
                        class="text-warning">{{ !empty($about->name) ? $about->name : '' }}</a></h1>
                <div class="mt-4 text-light text-center">
                    <span>
                        {{ !empty($about->job_title) ? $about->job_title : '' }}
                    </span>
                </div>
                <div class="mt-4 text-light text-center">
                    <a href="admin/dashboard" class="btn btn-block btn-warning" target="_blank">
                        Admin Login
                    </a>
                    <a href="{{ !empty($about->cv) ? asset('admin/'.$about->cv) : '' }}" class="btn btn-block btn-primary"
                        target="_blank">
                        Download CV
                    </a>
                    </a>
                </div>
                <div class="mt-3 text-light text-center">
                    <span>
                        <a href="https://wa.me/{{ !empty($about->phone) ? $about->phone : '' }}"
                            target="_blank">{{ !empty($about->phone) ? $about->phone : '' }}</a>
                        <a href="mailto:kuswandi.ti@gmail.com">{{ !empty($about->email) ? $about->email : '' }}</a>
                    </span>
                </div>
                <div class="social-links mt-4 text-center">
                    <a href="https://www.facebook.com/kuswandi404/" class="facebook" target="_blank"><i
                            class="bx bxl-facebook"></i></a>
                    <a href="https://www.instagram.com/kuswandi0037" class="instagram" target="_blank"><i
                            class="bx bxl-instagram"></i></a>
                    <a href="https://www.linkedin.com/in/kuswandi-mr-a0068958/" class="linkedin" target="_blank"><i
                            class="bx bxl-linkedin"></i></a>
                </div>
            </div>

            <nav id="navbar" class="nav-menu navbar">
                <ul>
                    <li><a href="#hero" class="nav-link scrollto active"><i class="bx bx-home"></i>
                            <span>Home</span></a></li>
                    <li><a href="#about" class="nav-link scrollto"><i class="bx bx-user"></i> <span>About</span></a>
                    </li>
                    <li><a href="#skills" class="nav-link scrollto"><i class='bx bx-cog'></i> <span>Skills</span></a>
                    </li>
                    <li><a href="#educations" class="nav-link scrollto"><i class="bx bx-file-blank"></i>
                            <span>Educations</span></a></li>
                    <li><a href="#work_experience" class="nav-link scrollto"><i class='bx bx-briefcase'></i> <span>Work
                                Experience</span></a></li>
                    <li><a href="#portfolio" class="nav-link scrollto"><i class="bx bx-book-content"></i>
                            <span>Portfolio</span></a></li>
                    <li><a href="#contact" class="nav-link scrollto"><i class='bx bxs-contact'></i>
                            <span>Contact</span></a></li>
                </ul>
            </nav><!-- .nav-menu -->
        </div>
    </header>
    <!-- End Header -->

    <!-- ======= Hero Section ======= -->
    <section id="hero" class="d-flex flex-column justify-content-center align-items-center">
        <div class="hero-container" data-aos="fade-in">
            <h1>{{ !empty($about->name) ? $about->name : '' }}</h1>
            <p>I'm <span class="typed"
                    data-typed-items="{{ !empty($about->job_title) ? $about->job_title : '' }}"></span></p>
        </div>
    </section>
    <!-- End Hero -->

    <main id="main">

        <!-- ======= About Section ======= -->
        <section id="about" class="about">
            <div class="container">

                <div class="section-title">
                    <h2>About</h2>
                    <p>{{ !empty($about->about_description) ? $about->about_description : '' }}</p>
                </div>

                <div class="row">
                    <div class="col-lg-8 pt-4 pt-lg-0 content" data-aos="fade-left">
                        <div class="row">
                            <div class="col-lg-6">
                                <ul>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Date of Birth </strong>
                                        <span>{{ date('d M Y', strtotime(!empty($about->date_of_birth) ? $about->date_of_birth : '')) }}</span>
                                    </li>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Place of Birth </strong>
                                        <span>{{ !empty($about->place_of_birth) ? $about->place_of_birth : '' }}</span>
                                    </li>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Phone </strong> <span><a
                                                href="https://wa.me/{{ !empty($about->phone) ? $about->phone : '' }}"
                                                target="_blank">{{ !empty($about->phone) ? $about->phone : '' }}</a></span>
                                    </li>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Email </strong> <span><a
                                                href="mailto:kuswandi.ti@gmail.com">{{ !empty($about->email) ? $about->email : '' }}</a></span>
                                    </li>
                                </ul>
                            </div>
                            <div class="col-lg-6">
                                <ul>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Address </strong>
                                        <span>{{ !empty($about->address) ? $about->address : '' }}</span>
                                    </li>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Job Title </strong>
                                        <span>{{ !empty($about->job_title) ? $about->job_title : '' }}</span>
                                    </li>
                                    <li><i class="bi bi-chevron-right"></i> <strong>Job Desc. </strong>
                                        <span>{{ !empty($about->job_description) ? $about->job_description : '' }}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- End About Section -->

        <!-- ======= Skills Section ======= -->
        <section id="skills" class="skills section-bg">
            <div class="container">

                <div class="section-title">
                    <h2>Skills</h2>
                    <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit
                        sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias
                        ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                </div>

                <div class="row skills-content">
                    <div class="col-lg-12" data-aos="fade-up">
                        @forelse($skills as $skill)
                            <div class="progress">
                                <span class="skill">{{ $skill->skill_name }} <i
                                        class="val">{{ $skill->skill_experience }} year(s)</i></span>
                                <div class="progress-bar-wrap">
                                    @php
                                        $max_experience = 20;
                                        $persentase = ($skill->skill_experience / $max_experience) * 100;
                                    @endphp
                                    <div class="progress-bar" role="progressbar" style="width: {{ $persentase }}%"
                                        aria-valuenow="{{ $persentase }}" aria-valuemin="0"
                                        aria-valuemax="{{ $max_experience }}"></div>
                                </div>
                            </div>
                        @empty
                        @endforelse
                    </div>
                </div>

            </div>
        </section>
        <!-- End Skills Section -->

        <!-- ======= Education Section ======= -->
        <section id="educations" class="resume">
            <div class="container">

                <div class="section-title">
                    <h2>Educations</h2>
                    <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit
                        sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias
                        ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                </div>

                <div class="row">
                    <div class="col-lg-12" data-aos="fade-up">
                        @forelse($educations as $education)
                            <div class="resume-item">
                                <h4>{{ $education->education_name }}, {{ $education->education_city }}</h4>
                                <h5>{{ $education->education_year_from }} - {{ $education->education_year_to }}</h5>
                                @if ($education->education_major != null)
                                    <p><em><strong>Major : </strong>
                                            {{ $education->education_major == null ? '-' : $education->education_major }}</em>
                                    </p>
                                @endif
                                @if ($education->education_gpa != 0)
                                    <p><strong>GPA : </strong>
                                        {{ $education->education_gpa == 0 ? '-' : $education->education_gpa }}</p>
                                @endif
                            </div>
                        @empty
                        @endforelse
                    </div>
                </div>

            </div>
        </section>
        <!-- End Education Section -->

        <!-- ======= Work Experience Section ======= -->
        <section id="work_experience" class="resume">
            <div class="container">

                <div class="section-title">
                    <h2>Work Experience</h2>
                    <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit
                        sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias
                        ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                </div>

                <div class="row">
                    <div class="col-lg-12" data-aos="fade-up">
                        @foreach ($work_experiences as $we)
                            <div class="resume-item">
                                <h4>{{ $we->work_experience_name }}, {{ $we->work_experience_city }}</h4>
                                <h5>{{ $we->work_experience_year_from }} - {{ $we->work_experience_year_to }}</h5>
                                <p><em><strong>{{ $we->work_experience_position }}</strong></em></p>
                                <p>
                                    <strong>Job Description :</strong> {{ $we->work_experience_job_description }}
                                </p>
                                <p>
                                    <strong>Reason to Leave :</strong> {{ $we->work_experience_reason_to_leave }}
                                </p>
                            </div>
                        @endforeach
                    </div>
                </div>

            </div>
        </section>
        <!-- End Work Experience Section -->

        <!-- ======= Portfolio Section ======= -->
        <section id="portfolio" class="portfolio section-bg">
            <div class="container">

                <div class="section-title">
                    <h2>Portfolio</h2>
                    <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit
                        sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias
                        ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                </div>

                <div class="row" data-aos="fade-up">
                    <div class="col-lg-12 d-flex justify-content-center">
                        <ul id="portfolio-flters">
                            <li data-filter="*" class="filter-active">All</li>
                            @foreach ($portfolio_categories as $category)
                                <li data-filter=".filter-{{ strtolower($category->category_name) }}">
                                    {{ $category->category_name }}
                                </li>
                            @endforeach
                        </ul>
                    </div>
                </div>

                <div class="row portfolio-container" data-aos="fade-up" data-aos-delay="100">
                    @foreach ($portfolios as $portfolio)
                        <div
                            class="col-lg-4 col-md-6 portfolio-item filter-{{ strtolower($portfolio->portfolio_category->category_name) }}">
                            <div class="portfolio-wrap">
                                {{-- <img src="assets/img/portfolio/portfolio-1.jpg" class="img-fluid" alt=""> --}}
                                <img src="assets/img/portfolio/project.png" class="img-fluid" alt="">
                                <div class="portfolio-links">
                                    {{-- <a href="assets/img/portfolio/portfolio-1.jpg"  --}}
                                    <a href="assets/img/portfolio/project.png" data-gallery="portfolioGallery"
                                        class="portfolio-lightbox" title="{{ $portfolio->project_name }}">
                                        <i class='bx bxs-show'></i>
                                    </a>
                                </div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </div>
        </section>
        <!-- End Portfolio Section -->

        <!-- ======= Contact Section ======= -->
        <section id="contact" class="contact">
            <div class="container">

                <div class="section-title">
                    <h2>Contact</h2>
                    <p>Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex aliquid fuga eum quidem. Sit
                        sint consectetur velit. Quisquam quos quisquam cupiditate. Et nemo qui impedit suscipit alias
                        ea. Quia fugiat sit in iste officiis commodi quidem hic quas.</p>
                </div>

                <div class="row" data-aos="fade-in">

                    <div class="col-lg-5 d-flex align-items-stretch">
                        <div class="info">
                            <div class="address">
                                <i class="bi bi-geo-alt"></i>
                                <h4>Location:</h4>
                                <p>{{ !empty($about->address) ? $about->address : '' }}</p>
                            </div>

                            <div class="email">
                                <i class="bi bi-envelope"></i>
                                <h4>Email:</h4>
                                <p>
                                    <a href="mailto:{{ !empty($about->email) ? $about->email : '' }}">
                                        {{ !empty($about->email) ? $about->email : '' }}
                                    </a>
                                </p>
                            </div>

                            <div class="phone">
                                <i class="bi bi-phone"></i>
                                <h4>Call:</h4>
                                <p><a href="https://wa.me/{{ !empty($about->phone) ? $about->phone : '' }}"
                                        target="_blank">{{ !empty($about->phone) ? $about->phone : '' }}</a></p>
                            </div>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1178.7024226534572!2d107.00685445229256!3d-6.436853308607611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e699749293b165d%3A0x81c8ebb4b3dd5ff0!2sRumah%20Kuswandi%20-%20Deka!5e0!3m2!1sid!2sid!4v1686709861655!5m2!1sid!2sid"
                                width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy"
                                referrerpolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>

                    <div class="col-lg-7 mt-5 mt-lg-0 d-flex align-items-stretch">
                        <form action="{{ route('contact.us.store') }}" method="POST" role="form"
                            class="php-email-form">
                            {{ csrf_field() }}
                            @if ($message = Session::get('success'))
                                <div class="alert alert-success alert-dismissible fade show" role="alert">
                                    {{ $message }}
                                </div>
                            @endif
                            @if ($errors->any())
                                <div class="alert alert-danger alert-dismissible fade show" role="alert">
                                    <strong>Please check the form below for errors</strong>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </div>
                            @endif
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="name">Your Name</label>
                                    <input type="text" name="name" class="form-control" id="name"
                                        required>
                                    <span class="text-danger">{{ $errors->first('name') }}</span>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="email">Your Email</label>
                                    <input type="email" class="form-control" name="email" id="email"
                                        required>
                                    <span class="text-danger">{{ $errors->first('email') }}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="subject">Subject</label>
                                <input type="text" class="form-control" name="subject" id="subject" required>
                                <span class="text-danger">{{ $errors->first('subject') }}</span>
                            </div>
                            <div class="form-group">
                                <label for="message">Message</label>
                                <textarea class="form-control" name="message" rows="10" required></textarea>
                                <span class="text-danger">{{ $errors->first('message') }}</span>
                            </div>
                            <div class="text-center"><button type="submit">Send Message</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        <!-- End Contact Section -->
    </main>
    <!-- End #main -->

    <!-- ======= Footer ======= -->
    {{-- <footer id="footer">
    <div class="container">
      <div class="copyright">
        &copy; Copyright <strong><span>iPortfolio</span></strong>
      </div>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/ -->
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>
  </footer> --}}
    <!-- End  Footer -->

    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><i
            class="bi bi-arrow-up-short"></i></a>

    <!-- Vendor JS Files -->
    <script src="{{ asset('assets/vendor/purecounter/purecounter_vanilla.js') }}"></script>
    <script src="{{ asset('assets/vendor/aos/aos.js') }}"></script>
    <script src="{{ asset('assets/vendor/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/glightbox/js/glightbox.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/isotope-layout/isotope.pkgd.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/swiper/swiper-bundle.min.js') }}"></script>
    <script src="{{ asset('assets/vendor/typed.js/typed.umd.js') }}"></script>
    <script src="{{ asset('assets/vendor/waypoints/noframework.waypoints.js') }}"></script>

    <!-- Template Main JS File -->
    <script src="{{ asset('assets/js/main.js') }}"></script>

</body>

</html>
