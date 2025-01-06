#define speedPinR 9 // right PWM pin connect MODEL-X ENA
#define RightMotorDirPin1 12 // right motor direction pin 1 to MODEL-X IN1 
#define RightMotorDirPin2 11 // right motor direction pin 2 to MODEL-X IN2
#define speedPinL 6 // left PWM pin connect MODEL-X ENB
#define LeftMotorDirPin1 7 // left motor direction pin 1 to MODEL-X IN3 
#define LeftMotorDirPin2 8 // left motor direction pin 1 to MODEL-X IN4 

void go_motor(int t=0)
{
    digitalWrite(RightMotorDirPin1, HIGH);
    digitalWrite(RightMotorDirPin2, LOW);
    digitalWrite(LeftMotorDirPin1, LOW);
    digitalWrite(LeftMotorDirPin2, HIGH);

    analogWrite(speedPinL, 200);
    analogWrite(speedPinR, 200);

    delay(t);
}

void stop_prog()
{
    digitalWrite(RightMotorDirPin1, LOW);
    digitalWrite(RightMotorDirPin2, LOW);
    digitalWrite(LeftMotorDirPin1, LOW);
    digitalWrite(LeftMotorDirPin2, LOW);
}

void set_motorspeed(int speed_L, int speed_R)
{
    analogWrite(speedPinL,speed_L); 
    analogWrite(speedPinR,speed_R);   
}


void init_GPIO() /* init pins */
{
    pinMode(RightMotorDirPin1, OUTPUT); 
    pinMode(RightMotorDirPin2, OUTPUT); 
    pinMode(speedPinL, OUTPUT);  

    pinMode(LeftMotorDirPin1, OUTPUT);
    pinMode(LeftMotorDirPin2, OUTPUT); 
    pinMode(speedPinR, OUTPUT); 
    stop_prog();
}

void setup()
{
    init_GPIO();
    
    go_motor(2000);

    stop_prog();
  
    delay(2000000);
}

void loop() {}