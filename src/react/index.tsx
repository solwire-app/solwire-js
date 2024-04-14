// @ts-nocheck

import React, { useEffect } from "react";
import { ArrowRightIcon, ExternalLinkIcon, NfcIcon } from "lucide-react";

import { config as solwireConfig } from "@/config";
import { Avatar, AvatarImage } from "@/react/components/ui/avatar";
import { Button } from "@/react/components/ui/button";
import {
  Drawlog,
  DrawlogContent,
  DrawlogDescription,
  DrawlogFooter,
  DrawlogHeader,
  DrawlogTitle,
  DrawlogTrigger,
} from "@/react/components/ui/drawlog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/react/components/ui/table";
import { useWindowSize } from "@/react/lib/hooks/use-window-size";

import type { BaseProps } from "../types";
import { cn } from "../utils/cn";
import { formatWalletAddress } from "../lib/address";
import { SolwireProvider } from "./context-provider";
import { useSolwire } from "./use-solwire";
import { setSolwireStyles } from "@/utils/stylesheet";

type PayWithSolwireProps = BaseProps;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    PayWithSolwireProps {}

const PayWithSolwire = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      redirectUri,
      amount,
      address,
      solTag,
      products,
      metadata,
      className,
      ...props
    },
    ref
  ) => {
    const { addresses, links } = useSolwire({
      redirectUri,
      amount,
      address,
      solTag,
      products,
      metadata,
    });

    const productsTotal = products?.reduce(
      (acc, product) => acc + (product.price ?? 0),
      0
    );

    const { isMobile } = useWindowSize();
    const [totalAmount, setTotalAmount] = React.useState<number>(
      (amount ?? 0) + (productsTotal ?? 0)
    );

    React.useEffect(() => {
      setSolwireStyles();

      if (!address && !solTag) {
        throw new Error("Address or $solTag is required");
      }

      if (address) {
        const isValid = addresses.validate(address);
        if (!isValid) {
          throw new Error("Invalid address");
        }
      }
    }, []);

    React.useEffect(() => {
      if (products?.length) {
        const productsTotal = products?.reduce(
          (acc, product) => acc + (product.price ?? 0),
          0
        );

        setTotalAmount(() => productsTotal);
      }

      if (amount) {
        setTotalAmount((prev) => prev + amount);
      }
    }, [amount, products]);

    function redirectToSolwire() {
      if (!!!amount && !products?.length) {
        throw new Error("Amount or products are required");
      }

      const link = links.payment.generate();
      links.payment.open(link);
    }

    return (
      <div className="sw-wrapper">
        <Drawlog>
          <DrawlogTrigger asChild>
            <Button
              ref={ref}
              className={cn("sw-gap-2 sw-flex", className)}
              {...props}
            >
              <NfcIcon className="sw-h-4 sw-w-4" />
              <span>
                Pay with <span className="sw-font-bold">Solwire</span>
              </span>
            </Button>
          </DrawlogTrigger>
          <DrawlogContent className="sw-dark sw-bg-background sw-text-foreground sw-max-w-lg">
            <DrawlogHeader>
              <DrawlogTitle className="sw-text-foreground">
                Pay with Solwire
              </DrawlogTitle>
              <DrawlogDescription className="sw-inline-block">
                <span className="text-balance">
                  Welcome to{" "}
                  <a
                    href={solwireConfig.urls.main}
                    className="sw-font-bold sw-text-primary"
                  >
                    Solwire
                  </a>
                  . You&apos;re about to&nbsp;
                  {products?.length ? (
                    <span className="sw-inline-flex">
                      purchase&nbsp;
                      {products.map((p, i) => (
                        <span className="sw-font-semibold">
                          {p.name}
                          <span className="sw-font-normal">
                            {i !== products.length - 1 &&
                              i !== products.length - 2 &&
                              ","}
                            {i === products.length - 2 && " &"}
                          </span>
                          &nbsp;
                        </span>
                      ))}
                      for
                    </span>
                  ) : (
                    <span>pay</span>
                  )}
                  &nbsp;
                  <span className="sw-font-semibold sw-text-foreground">
                    {totalAmount} SOL
                  </span>{" "}
                  {products?.length && <span>and transfer it&nbsp;</span>}
                  to{" "}
                  {address ? (
                    <a
                      href={`https://solscan.io/address/${address}`}
                      target="_blank"
                      className="sw-inline-flex sw-items-center sw-gap-0.5 sw-text-foreground"
                    >
                      <span className="sw-font-semibold sw-text-foreground">
                        {formatWalletAddress(address)}
                      </span>
                      <ExternalLinkIcon className="sw-size-3" />
                    </a>
                  ) : (
                    <span className="sw-font-semibold sw-text-foreground">
                      ${solTag}
                    </span>
                  )}{" "}
                  using Solwire.
                </span>
                &nbsp;
                <a
                  href={solwireConfig.urls.main}
                  target="_blank"
                  className="sw-inline-flex sw-items-center sw-gap-1 sw-text-foreground"
                >
                  <span className="sw-font-semibold">Learn more</span>
                  <ArrowRightIcon className="sw-size-3.5" />
                </a>
              </DrawlogDescription>
            </DrawlogHeader>
            {Array.isArray(products) && !!products.length && (
              <div className="sw-py-4">
                <div>
                  <h2 className="sw-text-base sw-font-semibold">Products</h2>
                </div>
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="sw-hidden sm:sw-table-cell">
                          Product
                        </TableHead>
                        <TableHead className="sw-hidden sm:sw-table-cell">
                          Description
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[...products].map((product, index) => (
                        <TableRow key={index + product.name}>
                          <TableCell className="sw-flex sw-items-center sw-gap-2">
                            <Avatar>
                              <AvatarImage src={product.image} />
                            </Avatar>
                            <div>
                              <div className="sw-font-semibold">
                                {product.name}
                              </div>
                              <span className="sw-hidden sw-truncate sw-text-xs sw-text-muted-foreground md:sw-inline">
                                {product.id ? product.id.slice(0, 12) : "N/A"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="sw-table-cell">
                              <span className="sw-truncate sw-text-muted-foreground">
                                {product.description}
                              </span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
            <DrawlogFooter className="sw-flex sw-gap-2">
              <Button
                size={isMobile ? "default" : "sm"}
                className={cn(
                  "sw-w-auto",
                  isMobile ? "sw-gap-1" : "sw-h-8 sw-gap-1"
                )}
                onClick={redirectToSolwire}
              >
                <span>
                  Pay{" "}
                  <span className="sw-inline-block sw-font-bold md:sw-hidden">
                    {totalAmount} SOL
                  </span>{" "}
                  with <span className="sw-font-bold">Solwire</span>
                </span>
                <ArrowRightIcon
                  className={cn(isMobile ? "sw-size-4" : "sw-size-3.5")}
                />
              </Button>
            </DrawlogFooter>
          </DrawlogContent>
        </Drawlog>
      </div>
    );
  }
);

export {
  useSolwire,
  PayWithSolwire,
  SolwireProvider,
  type PayWithSolwireProps,
};
