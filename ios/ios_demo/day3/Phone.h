//
//  Phone.h
//  day3
//
//  Created by banli on 22/05/2020.
//  Copyright © 2020 banli. All rights reserved.
//

#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface Phone : NSObject

-(void) makeCall;
-(void) sendMessage: (int) x;
-(void) chat;

@end

NS_ASSUME_NONNULL_END
