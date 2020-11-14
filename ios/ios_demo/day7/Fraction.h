//
//  Fraction.h
//  day7
//
//  Created by banli on 23/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Fraction : NSObject

@property int numerator, denominator;

-(void) print;
-(void) setTo: (int) n over: (int) d;
-(double) convertToNum;
-(void) add: (Fraction *) f;
-(void) reduce;
+(void) sayHello;
@end

NS_ASSUME_NONNULL_END
