<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;

class SendMail extends Controller
{
    public function sendMail()
    {
        $data = [
            'subject' => 'Test',
            'msg' => 'Webcome to Npt Shop'
        ];

        Mail::send('emails-template.sendmail', $data, function($mail) {
            $mail->from('truongnp@fabatechnology.com', 'Truong Npt');
            $mail->to('truongnpt1998@gmail.com', 'Truong NP');
            $mail->subject('Test Send Mail');
        });
    }
}
