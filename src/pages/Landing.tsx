
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Landing: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-white">
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pt-10 pb-24 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Learn and grow with <span className="text-primary">CourseRegistry</span>
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  A modern platform for students and instructors to manage course registrations
                  easily. Browse courses, track enrollments, and manage your educational journey.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  {!isAuthenticated ? (
                    <>
                      <Link
                        to="/login"
                        className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                      >
                        Get started
                      </Link>
                      <Link
                        to="/signup"
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        Create an account <span aria-hidden="true">→</span>
                      </Link>
                    </>
                  ) : (
                    <Link
                      to="/dashboard"
                      className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    >
                      Go to Dashboard
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div
              className="absolute inset-y-0 right-1/2 -z-10 -mr-10 w-[200%] skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 md:-mr-20 lg:-mr-36"
              aria-hidden="true"
            />
            <div className="shadow-lg md:rounded-3xl">
              <div className="bg-indigo-500 [clip-path:inset(0)] md:[clip-path:inset(0_round_theme(borderRadius.3xl))]">
                <div
                  className="absolute -inset-y-px left-1/2 -z-10 ml-10 w-[200%] skew-x-[-30deg] bg-indigo-100 opacity-20 ring-1 ring-inset ring-white md:ml-20 lg:ml-36"
                  aria-hidden="true"
                />
                <div className="relative px-6 pt-8 sm:pt-16 md:pl-16 md:pr-0">
                  <div className="mx-auto max-w-2xl md:mx-0 md:max-w-none">
                    <div className="w-screen overflow-hidden rounded-tl-xl bg-gray-900">
                      <div className="flex bg-gray-800/40 ring-1 ring-white/5">
                        <div className="-mb-px flex text-sm font-medium leading-6 text-gray-400">
                          <div className="border-b border-r border-b-white/20 border-r-white/10 bg-white/5 py-2 px-4 text-white">
                            CourseRegistry Dashboard
                          </div>
                          <div className="border-r border-gray-600/10 py-2 px-4">Courses</div>
                        </div>
                      </div>
                      <div className="px-6 pt-6 pb-14 bg-gradient-to-b from-gray-800 to-gray-900">
                        {/* Mock dashboard content */}
                        <div className="bg-white/5 p-4 rounded-lg mb-4">
                          <h3 className="text-white text-lg mb-2">Welcome to CourseRegistry</h3>
                          <p className="text-gray-300 text-sm">
                            Your personal learning dashboard
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-white/5 p-3 rounded-lg">
                            <div className="text-gray-300 text-xs mb-1">Enrolled Courses</div>
                            <div className="text-white text-lg">4</div>
                          </div>
                          <div className="bg-white/5 p-3 rounded-lg">
                            <div className="text-gray-300 text-xs mb-1">Credits</div>
                            <div className="text-white text-lg">12</div>
                          </div>
                        </div>
                        <div className="bg-white/5 p-4 rounded-lg">
                          <div className="text-gray-300 text-xs mb-3">Recent Activity</div>
                          <div className="space-y-2">
                            <div className="bg-white/10 p-2 rounded">
                              <div className="text-white text-sm">Enrolled in Web Development</div>
                              <div className="text-gray-400 text-xs">2 hours ago</div>
                            </div>
                            <div className="bg-white/10 p-2 rounded">
                              <div className="text-white text-sm">Completed Introduction to CS</div>
                              <div className="text-gray-400 text-xs">Yesterday</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-black/10 md:rounded-3xl"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base font-semibold leading-7 text-primary">
            Everything you need in one place
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Features for students and instructors
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                Course Management
              </dt>
              <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Instructors can easily create, update, and manage their courses. Track enrollment
                  and student progress in one place.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                Simple Registration
              </dt>
              <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Students can browse available courses, enroll with a single click, and manage
                  their course load effortlessly.
                </p>
              </dd>
            </div>
            <div className="flex flex-col">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                Personalized Dashboard
              </dt>
              <dd className="mt-2 flex flex-auto flex-col text-base leading-7 text-gray-600">
                <p className="flex-auto">
                  Customized dashboards for both students and instructors to monitor progress and
                  manage their educational journey.
                </p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Landing;
