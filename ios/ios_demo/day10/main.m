//
//  main.m
//  day10
//
//  Created by banli on 23/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//
#import <Foundation/Foundation.h>
#import "Person.h"

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Person *p1 = [[Person alloc] init];
        
        NSLog(@"%i", [p1 age]);
        
    }
    return 0;
}
