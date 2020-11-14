//
//  main.m
//  ios_demo
//
//  Created by banli on 21/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//


#import <Foundation/Foundation.h>
#import "Person.h"

void sayHello(char str){
    NSLog(@"Hello %c", str);
}

void createPerson(){
    // 实例化对象
    // alloc 为对象分配内存
    // init 进行初始化操作
    Person *p1 = [[Person alloc] init];
    // 也可以通过 new
    Person *p2 = [Person new];
    NSLog(@"p1 = %p, p2 = %p", p1, p2);
    
}

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        
        createPerson();
        NSLog(@"argc = %d", argc);
        NSLog(@"argv = %d", argc);
        for(int i  = 0;i<argc;i++){
            NSLog(@"i %s", i);
        }
        
        int a = 1;
        int b = 2;
        int c = a + b;
        NSLog(@"a + b = %d", c);
        
        // 只申明 int ，默认为0
        int d;
        NSLog(@"d = %d", d);
        
        
        for (int a = 1; a<10; a++) {
            NSLog(@"a = %d", a);
        }
        
        int i = 0;
    a:{
        i++;
        NSLog(@"i = %d", i);
        if (i<10) goto a;
    }
        
        c = 10;
        switch (c) {
            case 10:
                NSLog(@"中奖了");
                break;
                
            default:
                break;
        }
        
    }
    
    sayHello('e');
    return 0;
}

