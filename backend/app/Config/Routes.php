<?php

namespace Config;

// Create a new instance of our RouteCollection class.
$routes = Services::routes();

// Load the system's routing file first, so that the app and ENVIRONMENT
// can override as needed.
if (file_exists(SYSTEMPATH . 'Config/Routes.php')) {
    require SYSTEMPATH . 'Config/Routes.php';
}

/*
 * --------------------------------------------------------------------
 * Router Setup
 * --------------------------------------------------------------------
 */
$routes->setDefaultNamespace('App\Controllers');
$routes->setDefaultController('Home');
$routes->setDefaultMethod('index');
$routes->setTranslateURIDashes(false);
$routes->set404Override();
$routes->setAutoRoute(true);

// User Routes

// $routes->post('updateuser/(:num)', 'UserController::update/$1');
// $routes->get('deleteuser/(:num)', 'UserController::delete/$1');
// $routes->get('getalluser', 'UserController::getalldata');
// $routes->get('getuser/(:num)', 'UserController::getone/$1');
// $routes->post('putuser', 'UserController::insertdata');


//Auth
$routes->post('register', 'UserController::registerUser');
$routes->post('login', 'UserController::loginUser');
$routes->post('forgot', 'UserController::forgotPass');
$routes->post('updatePass', 'UserController::updatePass');
$routes->post('deleteAccount', 'UserController::deleteAccount');

//All Users
$routes->get('getAllUsers', 'UserController::getAllUsers');

// WorkOut 
$routes->post('workoutStatusPut/(:num)', 'WorkoutController::putWorkout/$1');
$routes->get('workoutStatusGet/(:num)', 'WorkoutController::getWorkout/$1');

//Meditation
$routes->post('putMeditation/(:num)', 'MeditationController::putMeditation/$1');

//Social
$routes->post('putSocial/(:num)', 'SocialController::putSocial/$1');

//Reading
$routes->post('putReading/(:num)', 'ReadingController::putReading/$1');

//Water
$routes->post('putWater/(:num)', 'WaterController::putWater/$1');

//Movement
$routes->post('putMovement/(:num)', 'MovementController::putMovement/$1');

//Screen
$routes->post('putScreen/(:num)', 'ScreenController::putScreen/$1');

//Kindness
$routes->post('putKindness/(:num)', 'KindnessController::putKindness/$1');

//Finance
$routes->get('getFinance/(:num)', 'FinanceController::getFinance/$1');
$routes->post('putFinance/(:num)', 'FinanceController::putFinance/$1');

// Todo
$routes->post('insertTodo', 'TodoController::insertTodo');
$routes->get('getTodo/(:num)', 'TodoController::getTodo/$1');
$routes->post('updateTodo/(:num)', 'TodoController::updateTodo/$1');
$routes->post('deleteTodo/(:num)', 'TodoController::deleteTodo/$1');

//Journal
$routes->get('getJournal/(:num)', 'JournalController::getJournal/$1');
$routes->post('putJournal/(:num)', 'JournalController::putJournal/$1');


//Eating
$routes->get('getEating/(:num)', 'EatingController::getEating/$1');
$routes->post('putEating/(:num)', 'EatingController::putEating/$1');

//Records
$routes->get('getWeeklyRecords/(:num)', 'WeeklyController::getWeeklyRecords/$1');


//Articles, books and APPS Routes
$routes->get('getWorkoutArticles', 'WorkoutDataController::getWorkoutArticles');

$routes->get('getMeditationArticles', 'MeditationDataController::getMeditationArticles');
$routes->get('getMeditationApps', 'MeditationDataController::getMeditationApps');

$routes->get('getEatingArticles', 'EatingDataController::getEatingArticles');

$routes->get('getSocialArticles', 'SocialDataController::getSocialArticles');

$routes->get('getReadingArticles', 'ReadingDataController::getReadingArticles');
$routes->get('getReadingBooks', 'ReadingDataController::getReadingBooks');

$routes->get('getJournalArticles', 'JournalDataController::getJournalArticles');
$routes->get('getJournalBooks', 'JournalDataController::getJournalBooks');

$routes->get('getFinanceVideos', 'FinanceDataController::getFinanceVideos');
$routes->get('getFinanceBooks', 'FinanceDataController::getFinanceBooks');

$routes->get('getMovementArticles', 'MovementDataController::getMovementArticles');

$routes->get('getWaterArticles', 'WaterDataController::getWaterArticles');

$routes->get('getScreenArticles', 'ScreenDataController::getScreenArticles');

$routes->get('getKindnessArticles', 'KindnessDataController::getKindnessArticles');

//Video Links 
$routes->get('getWorkoutVideo/(:num)', 'WorkoutDataController::getWorkoutVideo/$1');
$routes->get('getAllWorkoutVideo', 'WorkoutDataController::getAllWorkoutVideo');
$routes->get('getMeditationVideo/(:num)', 'MeditationDataController::getMeditationVideo/$1');
$routes->get('getAllMeditationVideo', 'MeditationDataController::getAllMeditationVideo');


//Add Data
//Videos
$routes->post('addWorkoutVideo', 'WorkoutDataController::addWorkoutVideo');
$routes->post('addMeditationVideo', 'MeditationDataController::addMeditationVideo');
$routes->post('addFinanceVideo', 'FinanceDataController::addFinanceVideo');

//Books
$routes->post('addFinanceBook', 'FinanceDataController::addFinanceBook');
$routes->post('addJournalBook', 'JournalDataController::addJournalBook');
$routes->post('addReadingBook', 'ReadingDataController::addReadingBook');

//Articles
$routes->post('addEatingArticle', 'EatingDataController::addEatingArticle');
$routes->post('addJournalArticle', 'JournalDataController::addJournalArticle');
$routes->post('addKindnessArticle', 'KindnessDataController::addKindnessArticle');
$routes->post('addMeditationArticle', 'MeditationDataController::addMeditationArticle');
$routes->post('addMovementArticle', 'MovementDataController::addMovementArticle');
$routes->post('addReadingArticle', 'ReadingDataController::addReadingArticle');
$routes->post('addScreenArticle', 'ScreenDataController::addScreenArticle');
$routes->post('addSocialArticle', 'SocialDataController::addSocialArticle');
$routes->post('addWaterArticle', 'WaterDataController::addWaterArticle');
$routes->post('addWorkoutArticle', 'WorkoutDataController::addWorkoutArticle');


//Delete Data
//Videos
$routes->post('deleteFinanceVideo', 'FinanceDataController::deleteFinanceVideo');
$routes->post('deleteMeditationVideo', 'MeditationDataController::deleteMeditationVideo');
$routes->post('deleteWorkoutVideo', 'WorkoutDataController::deleteWorkoutVideo');



//Books
$routes->post('deleteFinanceBook', 'FinanceDataController::deleteFinanceBook');
$routes->post('deleteJournalBook', 'JournalDataController::deleteJournalBook');
$routes->post('deleteReadingBook', 'ReadingDataController::deleteReadingBook');



//Articles
$routes->post('deleteEatingArticle', 'EatingDataController::deleteEatingArticle');
$routes->post('deleteJournalArticle', 'JournalDataController::deleteJournalArticle');
$routes->post('deleteKindnessArticle', 'KindnessDataController::deleteKindnessArticle');
$routes->post('deleteMeditationArticle', 'MeditationDataController::deleteMeditationArticle');
$routes->post('deleteMovementArticle', 'MovementDataController::deleteMovementArticle');
$routes->post('deleteReadingArticle', 'ReadingDataController::deleteReadingArticle');
$routes->post('deleteScreenArticle', 'ScreenDataController::deleteScreenArticle');
$routes->post('deleteSocialArticle', 'SocialDataController::deleteSocialArticle');
$routes->post('deleteWaterArticle', 'WaterDataController::deleteWaterArticle');
$routes->post('deleteWorkoutArticle', 'WorkoutDataController::deleteWorkoutArticle');



 /* --------------------------------------------------------------------
 * Additional Routing
 * --------------------------------------------------------------------
 *
 * There will often be times that you need additional routing and you
 * need it to be able to override any defaults in this file. Environment
 * based routes is one such time. require() additional route files here
 * to make that happen.
 *
 * You will have access to the $routes object within that file without
 * needing to reload it.
 */
if (file_exists(APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php')) {
    require APPPATH . 'Config/' . ENVIRONMENT . '/Routes.php';
}
