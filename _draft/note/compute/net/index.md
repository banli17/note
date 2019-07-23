---
title: "计算机网络协议"
date: 2017-03-25 04:30:35
tags:
toc: true
---

##  简介

大学计算机的核心课程: 计算机组成与系统结构、数据结构与算法、操作系统、计算机网络、编译原理

协议的三要素：

1. 语法
2. 语义
3. 顺序

比如计算机语言就是人类和计算机沟通的协议。

http协议也是符合规则的。符合语法格式，每个内容都是有意义的，符合属性，点浏览器，浏览器发出http请求。

```
HTTP/1.1 200 OK
Date: Tue, 27 Mar 2018 16:50:26 GMT
Content-Type: text/html;charset=UTF-8
Content-Language: zh-CN
<!DOCTYPE html>
<html>
<head>
<base href="https://pages.kaola.com/" />
<meta charset="utf-8"/> <title> 网易考拉 3 周年主会场 </title>
```

下单的过程

1. 输入网址URL，浏览器只知道名称，不知道地点，所以通过DNS协议或HTTPDNS查找。得到ip地址。ip地址是互联网的门牌号。
2. 浏览器打包请求，通过http或https协议。DNS/HTTP/HTTPS属于应用层。应用层的包交给传输层，通过socket编程实现。
3. 传输层有2种协议：无连接UDP协议，面向连接的TCP协议。面向连接就是保证包到达，否则重新发送直到。
4. TCP协议头有2个端口，浏览器监听的端口，服务器监听的端口。操作系统通过端口判断包交给哪个进程。
5. 传输层封装完毕，浏览器将包交给操作系统的网络层。网络层协议是IP协议。IP协议头里有源IP地址和目标IP地址。
6. 操作系统按照目标IP地址查找机器，它会判断IP地址是本地还是外地。
7. 操作系统启动时会被DHCP协议配置IP地址，以及默认的网关IP地址:192.168.1.1。
8. 操作系统通过ARP协议收到网关的MAC地址。
9. 操作系统将IP包交给MAC层，网卡将包发出去，因为包里有网关的MAC地址，所以能够送达网关。
10. 网关收到包，会根据路由表看下一步怎么走，局域网通过MAC地址通信。出了局域网就要通过IP了。
11. 网关通过路由协议(常用的OSPF和BGP)看下一站怎么走，也要通过自己和下一个网关的MAC地址去下一个网关。
12. 最后一个网关知道这个包要去的地方，就会吼一声谁是目标IP，目标服务器会回复一个MAC地址。网络包通过这个MAC地址找目标服务器。
13. 目标服务器发现MAC地址对上了，取下MAC发给操作系统网络层。
14. ip对上了，取下ip，ip头里写着上一层封装的是TCP协议，将它交给TCP层。
15. TCP层收到的每个包，都会回复收到了。
16. 如果发送端的TCP层没有收到回复，则会重新发送，直到收到。
17. TCP头有目标端口号，通过端口号，找到监听该端口的进程如Apache。进程得到HTTP进行处理。Apache负责调度php或mysql等进行处理。调度是通过RPC调用。
18. Apache发现都处理完了，会回复https包。


## 网络分层的含义

复杂的程序都要分层。封包和解包。

二层设备：处理MAC层
三层设备：处理MAC层和IP层。
四层LB：
七层LB中层：


## ifconfig

查看ip
- window: ipconfig
- linux: ifconfig,ip addr

linux通过安装net-tools或iproute2可以运行这两个命令。

```
root@test:~# ip addr
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc pfifo_fast state UP group default qlen 1000
    link/ether fa:16:3e:c7:79:75 brd ff:ff:ff:ff:ff:ff
    inet 10.100.122.2/24 brd 10.100.122.255 scope global eth0
       valid_lft forever preferred_lft forever
    inet6 fe80::f816:3eff:fec7:7975/64 scope link
       valid_lft forever preferred_lft forever
```

valid_lft = Valid Lifetime
preferred_lft = Preferred Lifetime

如上10.10.122.2就是一个ip地址，被分为4部分，每部分8个bit，所以ip总共32位。但是现在计算机太多，这样的ip不够用。所以有了IPv6，也就是上面的 fe80::f816:3eff:fec7:7975/64。这个有128位，现在就够用了。

32位的ip不够用，还被分为了5类。

A: 0 + 7位网络号 + 24位主机号 0.0.0.0 - 127.255.255.255 16777214 
B: 10 + 14位网络号 + 16位主机号
C: 110 + 21位网络号 + 8位主机号

无类型域间选路(CIDR)

这种方式将IP分为2部分，如上面的10.100.122.2/24，后面的24表示前24位是网络号，后8位是主机号。

广播地址：10.100.122.255，发这个地址，所有10.100.122网络的机器都可以收到。
子网掩码：255.255.255.0

ip和子网掩码进行AND计算，得到网络号：10.100.122.0

共有IP地址和私有IP地址

私有IP地址段允许组织内部自己管理。

计算第一个地址，子网掩码和广播地址。

16.158.165.91/22
16.158.101001  网络号  01.91 是机器号
第一个地址是16.158.10100100.1 即 16.158.164.1
子网掩码 255.255.111111 00.0 即 255.255.252.0
广播地址 16.158.10100 11.255 即 16.158.167.255

ip地址后面有个 scope，对于eth0，是global，说明王卡是可以对外的。对于lo，是host，表示只提供本机相互通信。

lo全称是loopback，环回接口，往往会分配到127.0.0.1地址，表示经过内核处理后直接返回，不会在任何网络中出现。

MAC地址：fa:16:3e:c7:79:75，是网卡的物理地址，是6位的十六进制。

MAC地址是唯一的，为了组网的时候，不同的网卡放在一个网络里可以不用担心冲突。

网络设备的状态标识：<BROADCAST,MULTICAST,UP,LOWER_UP> 叫做net_device flags。

UP表示网卡处于启动的状态，BROADCAST表示网卡有广播地址，可以发送广播包，MULTICAST表示网卡可以发送多播包；LOWER_UP表示L1是启动的，即网线插着。MTU1500表示以太网的默认最大传输单元MTU为1500。

MTU是二层MAC，以太网规定MAC头加正文一起，不超过1500个字节。正文里有IP头，TCP头，HTTP头，如果放不下，就需要分片传输。

qdisc：queueing discipline，表示排队规则，内核通过某个网络接口发送数据包，需要按照这个规则将数据包加入队列。
pfifo: 对数据不进行处理，先进先出。
pfifo_fast: 队列包括三个波段(band)，每个波段先进先出，波段优先级分为三层 band0,band1,band2。

数据包是按照服务类型(Type of Service, TOS)被分配到三个波段的，TOS是IP头里的一个字段，代表当前包是高优先级，还是低优先级。

## DHCP与PXE

### 配置ip

通过命令行设置ip地址: 

```bash
# net-tools
$ sudo ifconfig eth1 10.0.0.1/24
$ sudo ifconfig eth1 up

# iproute2
$ sudo ip addr add 10.0.0.1/24 dev eth1
$ sudo ip link set up eth1
```

旁边的机器是192.168.1.x，我的配置16.158.23.6，ping 192.168.1.6，结果就是包发不出去，因为MAC层没有填。

首先会判断源和目标的网段，不一样，所以发给网关，没有配置网关，则包发不出去，网关配置不成192.168.1.6，因为网关和当前网络要在同一个网段。
不可能有台电脑，网管就配置下IP。所以有了DHCP。

DHCP `Dynamic Host Configuration Protocol`，动态主机配置协议。过程：

1. DHCP Discover: 一台新机器来，使用IP0.0.0.0发送一个广播包，目标IP255.255.255.255，[BOOTP[UDP[广播包]]]，DHCP就是BOOTP的增强版。BOOTP头是Boot request。
2. DHCP Offer: DHCP Server根据机器的MAC地址判断它是新机器，回一个IP地址，也是广播，因为新机器没有ip
3. 如果有多个DHCP Server，新机器可能收到很多回复，一般选最先到的DHCP Offer，并广播一个DHCP Request，包含它的MAC，接受的IP，提供IP的DHCP Server。这样其它DHCP Server就可以撤销提供的ip。客户端ip还是0.0.0.0
4. DHCP Server收到广播后，会广播一个DHCP ACK消息包，表示接受客户机，并将ip信息和其它信息发给客户机。Boot reply。


IP的收回和续期

客户机再租期过去50%时，向DHCP Server发送DHCP Request包，收到DHCP ACK消息包，会根据新的租期和其它的TCP/IP参数更新配置。

PXE:预启动执行环境

机房需要给新机器自动安装操作系统。

1. 启动BIOS，这是一个很小的系统，读取硬盘的MBR启动扇区，将GRUB启动起来，将权利给GRUB。
2. GRUB加载内核、加载作为根文件系统的initramfs文件，将权力给内核。
3. 内核启动，初始化操作系统。

安装系统只能在BIOS启动后，叫Pre-boot Execution Environmen，PXE

PXE需要一个ip，通过DHCP，DHCP还可以配置next-server，即PXE服务器地址、初始化启动文件filename。

1. 启动PXE客户端，通过DHCP得到ip、pxe服务器地址、启动文件pxelinux.0
2. 从pxe服务器下载启动文件，通过TFTP协议。所以PXE服务器上还有TFTP服务器。
3. pxe客户端收到文件，执行。这个文件会指示pxe客户端向TFTP服务器请求计算机配置信息prelinux.cfg。里面有内核在哪里，initramfs在哪里。pxe客户端会请求这些文件。
4. 启动linux内核。


## 从物理层到MAC层

第一层：物理层
电脑连电脑
- 1-3、2-6 交叉接法，12收信号，36发信号。
- 配置成一个网络：配置相同ip、子网掩码和默认网关
Hub: 集线器，在物理层工作，会把收到的数据都复制到其它端口。广播模式

第二层：数据链路层

Hub要解决的问题：
**1. 包发给谁的，谁收**

链路层地址，因为在第二层(处理媒体访问控制),所以常叫MAC地址。有了MAC地址，数据包在链路层广播，mAC网卡就能发现，如果包是它的，就收进来。打开ip包，也是自己的，再打开TCP包，端口是自己，80就给nginx，nginx返回网页，又层层封装。

**2. 都在发会不会混乱，谁先发谁后发**

MAC: MEDium Access COntrol 媒体访问控制，就是解决第2个问题，算法叫做多路访问。

解决2的方式
1. 信道划分：多个车道，你走你的我走我的
2. 轮流协议：现在你先发，等会我先发
3. 随机接入协议：先发出去，看到堵了，就回来，等会再去。 以太网是这种方式

**3. 发送出现错误怎么办**

以太网Ethernet是一种局域网技术。

以太网第二层最后是CRC，循环冗余检测。通过XOR异或算法来计算包是否发送过程中出现错误。

ARP协议：Address Resolution Protocol 是根据IP地址获取物理MAC地址的一个TCP/IP协议。本地有ARP表，发广播包问IP是x的MAC是啥，目标机器回复后，缓存IP-MAC映射。

ARP欺骗，就是修改IP-MAC映射，把别人的MAC地址改成自己的，结果发的数据都发给了自己，然后自己在当路由，发给其它人。

Hub机器多时数据太多有问题，交换机能智能记住哪个口对应的MAC，这样第一次建立后，下次就可以直接发给对应的口，不需要每个口都发了。这个叫转发表。

用一张图总结一下学到的知识点：

![](./network/5.物理层到数据链路层.jpg)
(物理层到数据链路层)


## 交换机与VLAN

### 拓扑结构

拓扑结构是指网络中各个站点相互连接的形式，多个交换机相连就形成了一个比较复杂的拓扑结构。

机器发广播的时候，交换机可以知道这个机器的方向，然后记住这个拓扑信息。

交换机工作在数据链路层，可以连电脑，也可以作为局域网的连接器。交换机的工作原理是：在端口成功连接时通过ARP协议学习MAC地址，保存一张交换表。之后只发对应的端口，而不是所有端口。

### 环路问题

交换机如果形成环路，本来机器1在交换机的左边，但是右边又收到了1的广播，以为它换了位置，就更新了。以次循环。

造成的影响

### 如何解决环路问题

将图中的环破了，生成树，生成树的算法叫做STP，全称Spanning Tree Protocol。

- Root Bridge:根交换机
- Designated Bridges: 指定交换机
- Bridge Protocol Data Units(BPDU)：网桥协议数据单元
- Priority Vector:优先级向量，就是一组ID数目，[Root Bridge ID, Root Path Cost, Bridge ID, Port ID]。

STP工作流程：

1. 首先每个交换机分配一个ID，这个ID表示优先级，网管可以给贵的分配高优先级。
2. 每个交换机使用网线相连，发送BPDU，优先级高的管理优先级低的，进行合并。之后只有管理者能发BPDU。
3. 优先级高的遇到优先级高的，组队归附。
4. 同门相遇，掌门与小弟相遇，就说明有环，可以升职；小弟与小弟相遇。
5. 掌门与其它帮派小弟相遇。如果掌门比小弟的掌门差，则会归属到小弟掌门边。
6. 不同门派小弟相遇，比掌门。

### 广播安全问题

因为广播会广播到所有人，可能会被抓到包。

- 物理隔离: 每个部门有单独的交换机，配置单独的子网，部门之间沟通通过路由器。
- 虚拟隔离：VLAN，或虚拟局域网。一个交换机可以连多个局域网。如果交换机支持VLAN，可以取出第二层的头里的VLAN ID(12位)，只有VLAN相同的包，才会互相转发，不同VLAN的包是看不见的。交换机之间通过Trunk口连接，它可以转发任何VLAN的口。

用一张图片来总结：

![](./network/6.交换机与VLAN.jpg)


## TCP

