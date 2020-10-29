//
//  ClassA.h
//  day8
//
//  Created by banli on 23/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface ClassA : NSObject
{
    int x;
}
-(void) initVar;
-(void) printVar;

@property int name;
@end

NS_ASSUME_NONNULL_END
