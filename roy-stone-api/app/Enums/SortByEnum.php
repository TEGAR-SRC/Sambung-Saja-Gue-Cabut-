<?php

namespace App\Enums;

enum SortByEnum:string {
  const ASC = 'asc';
  const DESC = 'desc';
  const ATOZ = 'a-z';
  const ZTOA = 'z-a';
  const HIGH_TO_LOW = 'high-low';
  const LOW_TO_HIGH = 'low-high';
  const DISCOUNT_HIGH_TO_LOW = 'discount-high-low';
  const NEWEST = 'newest';
  const OLDEST = 'oldest';
  const SMALLEST = 'smallest';
  const LARGEST = 'largest';
  const TODAY = 'today';
  const LAST_WEEK = 'last_week';
  const LAST_MONTH = 'last_month';
  const THIS_YEAR = 'this_year';
}
