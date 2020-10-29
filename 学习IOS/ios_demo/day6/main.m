//
//  main.m
//  day6
//
//  Created by banli on 22/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import <Foundation/Foundation.h>

int covertToNum(int d){
    int n = 10;
    if(d != 0){
        return n / d;
    }else{
        return NAN;
    }
}

// 判断是否是闰年
Boolean isRunYear(int year){
    int rem_4 = year % 4;
    int rem_100 = year % 100;
    int rem_400 = year % 400;
    if((rem_4 == 0 && rem_100!=0) || rem_400 == 0){
        NSLog(@"%i 是闰年", year);
        return true;
    }else{
        NSLog(@"%i 不是闰年", year);
        return false;
    }
}

void printPrime(){
    int p, d, isPrime;
    
    for(p = 2;p<=50;p++){
        isPrime = 1;
        for(d = 2;d < p;d++){
            if(p%d == 0) isPrime = 0;
        }
        if(isPrime != 0){
            NSLog(@"%i ", p);
        }
    }
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        NSLog(@"covertToNum 5 = %i", covertToNum(5));
        NSLog(@"covertToNum 5 = %i", covertToNum(0) ); // 是一个地址？
        
        isRunYear(1994);
        isRunYear(2000);
        
        printPrime();
        
        BOOL a = YES;
        NSLog(@"a = %i", a);  // a = 1
    }
    return 0;
    
    
}
