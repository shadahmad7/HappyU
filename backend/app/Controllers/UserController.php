<?php 
namespace App\Controllers;
use App\Models\UserModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;
use CodeIgniter\Controller;


class UserController extends Controller
{
    use ResponseTrait;
    
    

public function registerUser(){
        $userModel = new UserModel();
        $email = $this->request->getVar('email');

        $data1 = $userModel->where('user_email', $email)->find();

            $data = [
                'user_name' => $this->request->getVar('name'),
                'user_email' => $this->request->getVar('email'),
                'user_password' => sha1($this->request->getVar('password')),
            
            ];
            if($data1){
                if($data1['user_active'] == 0){
                     $response = [
                        'status'   => 201,
                        'data' => [
                                'success' => 'Your account is deactivated. Please contact to support'
                        ]
                    ];
                } else {
                    $response = [
                        'status'   => 201,
                        'data' => [
                            'success' => 'User already exists.'
                        ]
                    ];
                }
            } else {
                
               $userModel->insert($data);
               $data2 = $userModel->where('user_email', $email)->find();
               $data2=$data2[0];
               $response = [
              'status'   => 200,
              'data' => [
                'res' => $data2,
                  'success' => 'Registered successfully.'
              ]
          ];
    }
          return $this->respondCreated($response);
        }



        public function loginUser($email = null){
            $userModel = new UserModel();

            $email = $this->request->getVar('email');

            $data = $userModel->where('user_email', $email)->find();

            $pass = sha1($this->request->getVar('pass'));
            $rs = $userModel->where('user_email', $email)->where('user_password', $pass)->find();
                if($data){
                    if($rs)
                    {
                        // print_r($rs);
                        $rs=$rs[0];
                        if($rs['user_active'] == 1){
                            $response = [
                            'status'   => 201,
                            'data' => [
                                'res' => $rs,
                                'success' => 'Login Succesfully.'
                            ]
                        ];
                        } else {
                            $response = [
                            'status'   => 201,
                            'data' => [
                                'success' => 'Your account is deactivated. Please contact to support'
                            ]
                        ];
                        }
                        
                    } else {
                        $response = [
                            'status'   => 201,
                            'data' => [
                                'success' => 'Wrong Cred'
                            ]
                        ];
                    }
                   
               } else {
                $response = [
                    'status'   => 404,
                    'data' => [
                        'success' => 'User not exist'
                    ]
                ];
               }
               return $this->respondCreated($response);


           }
           
           
           
           
           
           
           
           
        


           
             public function forgotPass($email = null){
            $userModel = new UserModel();

            $email = $this->request->getVar('email');
            $rs = $userModel->where('user_email', $email)->find();
            
               
               
                    if($rs)
                    {
                       
                       $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
                        $pass = array(); //remember to declare $pass as an array
                        $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
                        for ($i = 0; $i < 8; $i++) {
                            $n = rand(0, $alphaLength);
                        $pass[] = $alphabet[$n];
                        }
                        $p =  implode($pass);
                       
                        $pass2 = sha1($p);
                         $data = [
                        'user_password' => $pass2,
                        'is_passwordchange' => true
                        
                        ];

                        $userModel->set($data)->where('user_email', $email)->update();
                        $to = $email;
                        $subject = "New Password";
                        $txt = "Your new password is {$p}";
                        $headers = "From: no-reply@happinesssamurai.com";
        
                        if(mail($to,$subject,$txt,$headers)){
                            $response = [
                                'status'   => 200,
                                'data' => [
                                    'success' => 'Email sent to your registered email address.'
                                ]
                            ];
                        } else {
                             $response = [
                                'status'   => 501,
                                'data' => [
                                    'failed' => 'Something went wrong, Please try again later!'
                                ]
                            ];
                        }

                       
                    } else {
                        $response = [
                            'status'   => 404,
                            'data' => [
                                'failed' => 'User not found'
                            ]
                        ];
                    }
                   
               return $this->respondCreated($response);


           }
           
           
            public function deleteAccount($id = null){
            $userModel = new UserModel();
            $id = $this->request->getVar('id');
            $data = ['user_active' => false,];

            $rs =  $userModel->set($data)->where('user_id', $id)->update();

            if($rs)
                 {
                $response = [
                    'status'   => 200,
                    'data' => [
                        'success' => 'Account deactivated successfully!'
                    ]
                ];
                 } 
                 else {
                $response = [
                    'status'   => 501,
                    'data' => [
                        'success' => 'Something went wrong, Password not updated!'
                    ]
                ];
               }
               return $this->respondCreated($response);
    }
           
           
           
             public function updatePass($id = null){
            $userModel = new UserModel();

            $id = $this->request->getVar('id');
            $pass1 = $this->request->getVar('cpass');
            $pass2 = $this->request->getVar('npass');
            
            $pass1 = sha1($pass1);
           

            $rs = $userModel->where('user_id', $id)->where('user_password', $pass1)->find();

                    if($rs)
                    {
                        
                         $data = [
                        'user_password' => sha1($pass2),
                        'is_passwordchange' => false
                        ];

                        $userModel->set($data)->where('user_id', $id)->update();
                        
                        $response = [
                            'status'   => 201,
                            'data' => [
                                'success' => 'Password Updated Succesfully.'
                            ]
                        ];
                   
               } else {
                $response = [
                    'status'   => 501,
                    'data' => [
                        'success' => 'Something went wrong, Password not updated!'
                    ]
                ];
               }
               return $this->respondCreated($response);


           }
           
           
               public function getAllUsers(){
            $userModel = new UserModel();
            $data = $userModel->orderBy('user_id', 'DESC')->findAll();
             $rs=$this->respond($data);
             if($rs)
        {
               $response = [
              'status'   => 200,
              'messages' => $data
          ];
        } 
        else
        {
             $response = [
              'status'   => 201,
              'messages' => "Data not found"
          ];
        }
        return $this->respondCreated($response);


           }
           
           
    }



    