import React from "react";
import classNames from "classnames"; // optional, if you want to use `classnames` package

export function Card({ children, className }) {
  return (
    <div className={classNames("rounded-lg border bg-background p-6 shadow-sm", className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function CardTitle({ children }) {
  return <h3 className="text-xl font-semibold">{children}</h3>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}

export function CardDescription({ children, className }) {
  return <p className={classNames("text-muted-foreground", className)}>{children}</p>;
}
