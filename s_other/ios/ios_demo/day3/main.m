//
//  main.m
//  day3
//
//  Created by banli on 22/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Fraction.h"
#import "Phone.h"

#import "XYPoint.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        int a = 1;
        int b = 3;
        NSLog(@"a/b = %i/%i", a, b);
        
        Fraction *f1;
        f1 = [Fraction alloc];
        f1 = [f1 init];
        
        [f1 setNumerator: 1];
        [f1 setDenominator: 3];
        
        // 打印显示分数
        NSLog(@"分数为: ");
        [f1 print];
        
        NSLog(@"f1 numerator %d", [f1 numerator]);
        
        Phone *p1 = [[Phone alloc] init];
        [p1 sendMessage: 3];
        
        XYPoint * p = [[XYPoint alloc] init];
        [p setX: 3];
        [p setY: 10];
        NSLog(@"x, y is %i, %i", [p getX], [p getY]);
    }
    return 0;
}
