//
//  main.m
//  day8
//
//  Created by banli on 23/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "ClassA.h"
#import "ClassB.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        ClassA *a = [[ClassA alloc] init];
        [a setName:10];
        NSLog(@" a 的值是 %i", [a name]);
        
        ClassB *b = [[ClassB alloc] init];
        [b printVar];  // 有继承的方法
        
        [b setName:10];
        NSLog(@"实例b 的 name 是 %i", [b name]);  // 也有 name 属性
        
        [b initVar];  // 使用继承的方法
        [b printVar];
        
        [b privateVar];
    }
    return 0;
}
