#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
今日の30日後の日付と曜日を計算するプログラム
"""

from datetime import datetime, timedelta

def main():
    # 今日の日付を取得
    today = datetime.now()
    
    # 30日後の日付を計算
    future = today + timedelta(days=30)
    
    # 曜日のリスト
    days = ['月', '火', '水', '木', '金', '土', '日']
    
    # 結果を表示
    print(f'今日: {today.strftime("%Y年%m月%d日")} ({days[today.weekday()]}曜日)')
    print(f'30日後: {future.strftime("%Y年%m月%d日")} ({days[future.weekday()]}曜日)')
    
    return future

if __name__ == '__main__':
    main()

