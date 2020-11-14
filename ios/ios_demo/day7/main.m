//
//  main.m
//  day7
//
//  Created by banli on 23/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "A.h"
#import "Fraction.h"

int testStatic(){
    NSLog(@"-----------------test static-------------------");
    static int c;
    NSLog(@"c is %i", c);
    c ++;
    return c;
}

void testFraction(){
    Fraction *f = [[Fraction alloc] init];
    Fraction.sayHello;
    [Fraction sayHello];
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        A *a = [A new];
//        a.name  = 10;
        [a setName:12];
        NSLog(@"a.name is %i" , a.name);
        
        // a.say(); 报错
//        a.say;  要这样，不报错
        [a say]; // say Hello
        
        // 多个参数
        [a eat: 12 drink: 20];
        int ts = testStatic();
        NSLog(@"ts is %i", ts);   // 1
        int ts1 = testStatic();
        NSLog(@"ts1 is %i", ts1); // 2
        int ts2 = testStatic();
        NSLog(@"ts2 is %i", ts2);  // 3
        
        testFraction();
    }
    return 0;
}
