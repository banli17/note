//
//  Calculator.h
//  day4
//
//  Created by banli on 22/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Calculator : NSObject
-(void) setN: (double) x;
-(double) getN;
-(void) add: (double) x;
-(void) minus: (double) x;
@end

NS_ASSUME_NONNULL_END
