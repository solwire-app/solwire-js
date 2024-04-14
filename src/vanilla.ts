import { config } from "./config";
import {
  formatWalletAddress,
  validateSolanaWalletAddress,
} from "./lib/address";
import { validateSolwireProducts, validateSolwireSolTag } from "./lib/solwire";
import type { BaseProps, Metadata, Product } from "./types";
import { setSolwireStyles } from "./utils/stylesheet";

type SolwireConfig = BaseProps & {
  redirectUri?: string;
};

export default class Solwire {
  public redirectUri: string;
  public address?: string;
  public amount?: number;
  public solTag?: string;
  public products?: Product[];
  public metadata?: Metadata;

  public SOL_MIN_AMOUNT = 0.001;
  // TODO: Add SPL Token support
  public CONTRACT_ADDRESS = "So11111111111111111111111111111111111111112";

  constructor(config: SolwireConfig) {
    this.redirectUri = config.redirectUri;
    this.address = config.address;
    this.amount = config.amount;
    this.solTag = config.solTag;
    this.products = config.products;
    this.metadata = config.metadata;

    if (this.address ?? this.amount) this.init();
  }

  private init() {
    if (!this.redirectUri.startsWith("http")) {
      throw new Error(
        "[Solwire] Error: Redirect URI must be a valid URL (http://)."
      );
    }

    if (this.amount) {
      const validAmount = this.validateAmount(this.amount);
      if (!validAmount) {
        throw new Error("[Solwire] Error: Invalid amount.");
      }
    }

    if (this.address) {
      const validAddress = this.validateAddress(this.address);
      if (!validAddress) {
        throw new Error("[Solwire] Error: Invalid recipient address.");
      }
    }
    if (this.solTag) {
      const validSolTag = this.validateSolTag(this.solTag);
      if (!validSolTag) {
        throw new Error("[Solwire] Error: Invalid recipient address.");
      }
      this.solTag = this.solTag.replace(/\$/g, "");
    }
    if (this.products?.length) {
      const validProducts = this.validateProducts(this.products);
      if (!validProducts) {
        throw new Error("[Solwire] Error: Invalid products schema.");
      }
      this.products = this.products;
    }
    if (this.metadata) {
      this.metadata = this.metadata;
    }
  }

  public setAddress(address: string) {
    const validAddress = this.validateAddress(address);

    if (!validAddress) {
      throw new Error("[Solwire] Error: Invalid recipient address.");
    }

    this.address = address;
  }

  public setSolTag(solTag: string) {
    const validSolTag = this.validateSolTag(solTag);

    if (!validSolTag) {
      throw new Error("[Solwire] Error: Invalid recipient address.");
    }

    this.solTag = solTag.replace(/\$/g, "");
  }

  public setAmount(amount: number) {
    const validAmount = this.validateAmount(amount);

    if (!validAmount) {
      throw new Error("[Solwire] Error: Invalid amount.");
    }

    this.amount = Number(amount.toFixed(4));
  }

  public setProducts(products: Product[]) {
    const validProducts = this.validateProducts(products);

    if (!validProducts) {
      throw new Error("[Solwire] Error: Invalid amount.");
    }

    const totalPrice = products.reduce(
      (acc, curr) => acc + (curr.price ?? 0),
      0
    );

    const amount = this?.amount ? this.amount + totalPrice : totalPrice;
    this.setAmount(amount);

    this.products = products;
  }

  public setMetadata(metadata: Metadata) {
    this.metadata = metadata;
  }

  public render(querySelector: string) {
    const element = document.querySelector(querySelector);

    if (!element) {
      throw new Error("[Solwire] Error: Element not found.");
    }

    setSolwireStyles();

    let error = "";

    if (!this.address && !this.solTag) {
      error = "[Solwire] Error: Address or $SolTag is required.";
      element.innerHTML = `<div class="text-destructive">${error}</div>`;
      throw new Error(error);
    }
    if (!this.amount) {
      error = "[Solwire] Error: Amount is required.";
      element.innerHTML = `<div class="text-destructive">${error}</div>`;
      throw new Error(error);
    }

    const buttonIcon =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 8.32a7.43 7.43 0 0 1 0 7.36"/><path d="M9.46 6.21a11.76 11.76 0 0 1 0 11.58"/><path d="M12.91 4.1a15.91 15.91 0 0 1 .01 15.8"/><path d="M16.37 2a20.16 20.16 0 0 1 0 20"/></svg>';
    const buttonText = "<span>Pay with <b>Solwire</b></span>";

    const button = document.createElement("button");
    button.innerHTML = buttonIcon + buttonText;
    button.className =
      "sw-button sw-items-center sw-border sw-justify-center sw-whitespace-nowrap sw-rounded-md sw-text-sm sw-font-medium sw-transition-colors focus-visible:sw-outline-none focus-visible:sw-ring-1 focus-visible:sw-ring-ring disabled:sw-pointer-events-none disabled:sw-opacity-50 sw-bg-primary sw-text-primary-foreground sw-shadow hover:sw-bg-primary/90 sw-h-9 sw-px-4 sw-py-2 sw-gap-2 sw-flex";
    element.appendChild(button);

    button.addEventListener("click", () => {
      const redirectToSolwire = confirm(`
      Welcome to Solwire. You're about to ${
        this.products?.length
          ? `purchase ${this.products.map(
              (p, i) =>
                `${p.name}${
                  i !== this.products!.length - 1 &&
                  i !== this.products!.length - 2
                    ? ","
                    : ""
                }${i === this.products!.length - 2 ? " &" : ""}`
            )} for`
          : "pay"
      } ${this.amount} SOL${
        !!this.products?.length ? " and transfer it " : " "
      }to ${
        this.address && this.solTag
          ? `$${this.solTag} (${formatWalletAddress(this.address)})`
          : this.address
          ? formatWalletAddress(this.address)
          : `$${this.solTag}`
      } using Solwire. Accept to proceed.`);

      if (!redirectToSolwire) return;
      const paymentLink = this.generatePaymentLink();
      this.openPaymentLink(paymentLink);
    });
  }

  public generatePaymentLink() {
    if (!this.address && !this.solTag) {
      throw new Error("[Solwire] Error: Address or SOL Tag is required.");
    }

    const params = new URLSearchParams({
      redirect_uri: this.redirectUri,
      address: this.address ? this.address : "",
      sol_tag: this.solTag ? this.solTag : "",
      amount: this.amount ? this.amount.toString() : "",
      contract_address: this.CONTRACT_ADDRESS,
      products: this.products ? JSON.stringify(this.products) : "",
      metadata: this.metadata ? JSON.stringify(this.metadata) : "",
    });

    return `${config.urls.dash}/pay?${params.toString()}`;
  }

  public openPaymentLink(link: string) {
    if (!link.startsWith(config.urls.dash)) {
      throw new Error("[Solwire] Error: Invalid payment link.");
    }

    window.open(link, "popupWindow", "width=600,height=600");
  }

  public validateAddress(address: string) {
    if (!validateSolanaWalletAddress(address)) {
      throw new Error("[Solwire] Error: Invalid recipient address.");
    }

    return true;
  }

  private validateSolTag(solTag: string) {
    if (!validateSolwireSolTag(solTag)) {
      throw new Error("[Solwire] Error: Invalid recipient address.");
    }

    return true;
  }

  private validateAmount(amount: number) {
    if (amount < this.SOL_MIN_AMOUNT) {
      throw new Error(
        `[Solwire] Error: Amount too low. Minimum ${this.SOL_MIN_AMOUNT} SOL required.`
      );
    }

    return true;
  }

  public validateProducts(products: Product[]) {
    if (!validateSolwireProducts(products)) {
      throw new Error("[Solwire] Error: Invalid products schema.");
    }

    return true;
  }
}
