//
//  main.m
//  day5
//
//  Created by banli on 22/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import <Foundation/Foundation.h>

void testFor(int lines){
    int sum = 0;
    for(int n = 1;n<=lines;n++){
        sum += n;
        NSLog(@"%3i %i",n, sum);
    }
}

void testWhile(){
    int count = 1;
    while(count < 10){
        count ++;
    }
    NSLog(@"最后的count值为 %i", count);
}

// 获取最大公约数
void testMaxGCD(){
    int u = 150, v = 35, temp;
    
    while (v != 0) {
        temp = u % v;
        u = v;
        v  = temp;
    }
    
    NSLog(@"最大公约数为 %u", u);
}

void reversePrintNum(){
    int n, right_digit;
    NSLog(@"请输入数字:");
    scanf("%i", &n);
    while (n !=0) {
        right_digit = n % 10;
        NSLog(@"%i", right_digit);
        n /= 10;
    }
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        int number;
        // 键盘输入
//        NSLog(@"请输入数字:");
//        scanf("%i", &number);
//        testFor(number);
        testFor(1000);
        testWhile();
        testMaxGCD();
        
        reversePrintNum();
    }
    return 0;
}
