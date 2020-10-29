//
//  main.m
//  day4
//
//  Created by banli on 22/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Calculator.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        int a= 1;
        int b = 2;
        NSLog(@"a/b = %i", a/b); // 0
        
        float a1 = 1;
        float b1 = 2;
        NSLog(@"a1/b1 = %f", a1/b1);  // 0.500000
        
        NSLog(@"res1 %i", 5 % 2);
        
        NSLog(@"---------------隐式转换---------------");
        float f1 = 123.125, f2;
        int i1, i2 = -150;
        i1 = f1;
        NSLog(@"浮点数 %f 变成了整数 %i", f1, i1);  // 浮点数 123.125000 变成了整数 123
        
        f1 = i2;
        NSLog(@"整数 %i 变成了浮点数 %f", i2, f1); // 整数 -150 变成了浮点数 -150.000000
        
        f1 = f1/150;
        NSLog(@"f1 %f", f1);  // f1 -1.000000
        
        f2 = (float) i2 / 100;
        NSLog(@"f2 强制转换 %f", f2);  // f2 强制转换 -1.500000
        
        NSLog(@"---------------计算器---------------");
        Calculator *ca = [[Calculator alloc] init];
        [ca setN:10];
        [ca add:20];
        [ca minus:5];
        NSLog(@"最后的值 %i", (int)[ca getN]);
    }
    return 0;
}
