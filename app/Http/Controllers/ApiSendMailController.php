<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Mail;
use App\Models\Emails;
use Illuminate\Support\Facades\Validator;


class ApiSendMailController extends Controller
{
    public function index()
    {
        $result = Emails::orderBy('id', 'desc')->get();
        
        return response()->json($result, 201);
    }

    function getMailById($id) 
    {
        $mail = Emails::find($id);

        return response()->json($mail, 201);
    }

    public function sendMail(Request $request)
    {
        $emails = new Emails();

        $rules=array(
            'mail_to' => 'required',
            'subject' => 'required',
            'message' => 'required'
        );
        $messages=array(
                'mail_to.required' => 'Please enter mail to.',
                'subject.required' => 'Please enter subject.',
                'message.required' => 'Please enter message.'
            );
        $validator=Validator::make($request->all(),$rules,$messages);
        if($validator->fails())
        {
            $messages=$validator->messages();
            $return=[
                "error" => "There was an error sending!",
                "error_detail" => $validator->errors()
            ];
            return response()->json($return);
        } 
        else {
            $data = [
                'subject' => $request->subject,
                'msg' => $request->message
            ];
    
            Mail::send('emails-template.sendmail', $data, function($mail) use($request) {

                $mail->from($request->mail_from, $request->sender);
                $mail->to($request->mail_to, $request->receive);
                $mail->subject($request->subject);
            });

            $emails->sender = $request->sender;
            $emails->mail_from = $request->mail_from;
            $emails->receive = $request->receive;
            $emails->mail_to = $request->mail_to;
            $emails->subject = $request->subject;
            $emails->message = $request->message;

            $emails->save();
    
            $return=[
                "success" => "Email has been send"
            ];
            return response()->json($return);
        }
    }

    function delete($id)
    {
        $email = Emails::find($id);

        $email->delete();
    }
}
