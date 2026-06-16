const Disclosure = () => {
  return (
    <div className="disclosure-page">
      <section className="disclosure-hero">
        <h1 className="disclosure-title">
          Alternative Investment Funds Disclosures
        </h1>
        <p className="disclosure-subtitle">
          Transparent reporting and regulatory information for our investment
          vehicles and management entities.
        </p>
      </section>

      <div className="disclosure-content">
        <div className="disclosure-grid">
          <div className="disclosure-item">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.75 18.75V2.75C16.75 1.64617 15.8538 0.75 14.75 0.75H4.75C3.64617 0.75 2.75 1.64617 2.75 2.75V18.75M16.75 18.75H18.75M16.75 18.75H11.75M2.75 18.75H0.75M2.75 18.75H7.75M6.75 4.75H7.75M6.75 8.75H7.75M11.75 4.75H12.75M11.75 8.75H12.75M7.75 18.75V13.75C7.75 13.1981 8.19808 12.75 8.75 12.75H10.75C11.3019 12.75 11.75 13.1981 11.75 13.75V18.75M7.75 18.75H11.75"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="disclosure-item-body">
              <div className="disclosure-item-label">FUND NAME</div>
              <div className="disclosure-item-value">BeeGlobal FoF</div>
            </div>
          </div>

          <div className="disclosure-item">
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.75 9.75H10.75M4.75 13.75H10.75M12.75 18.75H2.75C1.64617 18.75 0.75 17.8538 0.75 16.75V2.75C0.75 1.64617 1.64617 0.75 2.75 0.75H8.336C8.60119 0.750057 8.85551 0.855451 9.043 1.043L14.457 6.457C14.6445 6.64449 14.7499 6.89881 14.75 7.164V16.75C14.75 17.8538 13.8538 18.75 12.75 18.75L4.75 9.75"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="disclosure-item-body">
              <div className="disclosure-item-label">REGISTRATION NUMBER</div>
              <div className="disclosure-item-value">Still in process</div>
            </div>
          </div>

          <div className="disclosure-item">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.75 4.75H4.76M4.75 0.75H9.75C10.262 0.75 10.774 0.945 11.164 1.336L18.164 8.336C18.9448 9.117 18.9448 10.383 18.164 11.164L11.164 18.164C10.383 18.9448 9.117 18.9448 8.336 18.164L1.336 11.164C0.960342 10.7894 0.749453 10.2805 0.750001 9.75V4.75C0.750001 2.54234 2.54234 0.75 4.75 0.75V4.75"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="disclosure-item-body">
              <div className="disclosure-item-label">CATEGORY</div>
              <div className="disclosure-item-value">Category I AIF</div>
            </div>
          </div>

          <div className="disclosure-item">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.7502 12.005C15.8907 13.1612 12.8347 13.7538 9.75024 13.75C6.56724 13.75 3.53024 13.13 0.750244 12.005M13.7502 4.75V2.75C13.7502 1.64617 12.8541 0.75 11.7502 0.75H7.75024C6.64641 0.75 5.75024 1.64617 5.75024 2.75V4.75M9.75024 10.75H9.76024M2.75024 18.75H16.7502C17.8541 18.75 18.7502 17.8538 18.7502 16.75V6.75C18.7502 5.64617 17.8541 4.75 16.7502 4.75H2.75024C1.64641 4.75 0.750244 5.64617 0.750244 6.75V16.75C0.750244 17.8538 1.64641 18.75 2.75024 18.75L18.7502 12.005"
                stroke="#9CA3AF"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="disclosure-item-body">
              <div className="disclosure-item-label">FUND MANAGEMENT ENTITY (FME)</div>
              <div className="disclosure-item-value">BEE Legacy Management LLP</div>
            </div>
          </div>
        </div>

        <div className="disclosure-item disclosure-item--full">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.657 16.6567L13.414 20.8997C13.0392 21.2748 12.5307 21.4856 12.0005 21.4856C11.4703 21.4856 10.9618 21.2748 10.587 20.8997L6.343 16.6567C3.21892 13.5325 3.21901 8.46723 6.34319 5.3431C9.46738 2.21897 14.5326 2.21897 17.6568 5.3431C20.781 8.46723 20.7811 13.5325 17.657 16.6567V16.6567"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15 11C15 12.6557 13.6557 14 12 14C10.3443 14 9 12.6557 9 11C9 9.34425 10.3443 8 12 8C13.6557 8 15 9.34425 15 11V11"
              stroke="#9CA3AF"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="disclosure-item-body">
            <div className="disclosure-item-label">REGISTERED OFFICE</div>
            <div className="disclosure-item-value">
              Ground Floor, Unit No. B_111,
              <br />
              GIFT-Multi Services-SEZ, GIFT City,
              <br />
              Gandhinagar, Gujarat – 382050
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Disclosure;
