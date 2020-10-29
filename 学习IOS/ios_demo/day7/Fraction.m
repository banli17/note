//
//  Fraction.m
//  day7
//
//  Created by banli on 23/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import "Fraction.h"

static int num = 200;

@implementation Fraction

@synthesize numerator, denominator;

+(void) sayHello
{
    NSLog(@"hello");
}

-(void) print
{
    NSLog(@"%i/%i", numerator, denominator);
}

-(double) convertToNum
{
    if(denominator != 0){
        return (double) numerator / denominator;
    }else{
        return NAN;
    }
}

-(void) add: (Fraction *) f
{
    numerator = numerator * f.denominator + denominator * f.numerator;
    denominator = denominator * f.denominator;
}

-(void) reduce
{
    int u = numerator;
    int v= denominator;
    int temp;
    
    while (v !=0) {
        temp = u%v;
        u = v;
        v = temp;
    }
    
    numerator /= u;
    denominator /= u;
}

-(void) setTo:(int)n over:(int)d
{
    numerator = n;
    denominator = d;
}

@end
