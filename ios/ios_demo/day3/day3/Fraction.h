//
//  Fraction.h
//  day3
//
//  Created by banli on 22/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Fraction : NSObject

-(void) print;
-(void) setNumerator: (int) n;
-(void) setDenominator: (int) d;
-(int) numerator;
-(int) denominator;

@end

NS_ASSUME_NONNULL_END
