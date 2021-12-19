package com.nitin;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class Main {

    public static void main(String[] args) throws MalformedURLException, IOException,  org.json.simple.parser.ParseException{

        //create URL
        URL url = new URL("https://crio-xflix.herokuapp.com/v1/videos?genres=Education");
        //Send GET request and fetch data
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream()));

        //Read data line by line from buffer and print it out
        String output;
        String finalOutput="";
        while((output = br.readLine())!= null){
            //System.out.println(output);
            finalOutput=finalOutput.concat(output);
        }
        conn.disconnect();
        br.close();
        //System.out.println("Final json object is");
        //System.out.println(finalOutput);

        // Parsing data from JSON to string
        JSONParser parse = new JSONParser();

        JSONObject rootObj = (JSONObject) parse.parse(finalOutput);
        //System.out.println("Root object is :"+rootObj);

        JSONArray  jsonArray = (JSONArray) rootObj.get("videos");

        String messageString="";


        //System.out.println("------------------Printing the Array output------------");

        for (Object o : jsonArray) {

            JSONObject obj1 = (JSONObject) o;
            //System.out.println("For video (Title):"+obj1.get("title"));
            //System.out.println("-----------Genre:"+obj1.get("genre"));
            //System.out.println("-----------contentRating:"+obj1.get("contentRating"));
            //System.out.println("****************************************************");
            messageString = "Title: " + obj1.get("title") +
                    ", Genre: " + obj1.get("genre") +
                    ", ContentRating: " + obj1.get("contentRating");
            //System.out.println("MessageString -------:"+messageString);
            //System.out.println(jsonArray.get(i));

            //Sending message to telegram bot

            URL returnURl = new URL("https://api.telegram.org/botTOKEN/sendMessage?chat_id=249217924&text=" + messageString);
            HttpURLConnection conn1 = (HttpURLConnection) returnURl.openConnection();
            conn1.setRequestMethod("GET");
            BufferedReader br1 = new BufferedReader(new InputStreamReader(conn1.getInputStream()));
            //String output2;
            System.out.println("Output from message sent!! ");
            br1.close();
            conn1.disconnect();
        }

    }
}
