# MySQL

## MODIFY 和 CHANGE 的区别

从功能上而言，两者都可以用于修改表的字段，其中 `CHANGE` 相较于 `MODIFY` 而言，多了一个给字段重命名的能力。同时也是由于多的这个能力，导致两者在语法格式上稍有不同：

``` sql
ALTER TABLE t1 CHANGE col_a col_a BIGINT NOT NULL; # 使用 CHANGE

ALTER TABLE t1 MODIFY col_a BIGINT NOT NULL; # 使用 MODIFY
```

也就是说在使用 `CHANGE` 的时候，哪怕不涉及重命名，仍需要将字段名写两次。

## UNION 和 UNION ALL 的区别

`UNION` 和 `UNION ALL` 都可以将两个或多个有相同数量的结果集进行合并，不过也有一点区别：

- `UNION`: 会进行去重;
- `UNION ALL`: 会保留重复的数据。

### UNION
![UNION](./public/union.png)

### UNION ALL
![UNION ALL](./public/union_all.png)

## HAVING 语句

`HAVING` 可以起到与 `WHERE` 类似的查询作用，不同之处在于 `HAVING` 可以与聚合函数（SUM/COUNT/MIN/MAX/AVG 等）一起使用，而 `WHERE` 不行。

``` sql{7}
-- 统计年薪大于 40 万的员工
SELECT
    name,
    SUM(month_salary) as year_salary
FROM month_salary_table
WHERE year = 2021
HAVING SUM(month_salary) > 400000;
```

<Vssue title="MySQL" />