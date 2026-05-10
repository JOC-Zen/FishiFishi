import { UserService } from "@/features/users/services/UserService";
import { OrderService } from "@/features/orders/services/OrderService";
import TopBar from "@/shared/components/TopBar";
import styles from "./page.module.css";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * Client Detail Page - Dashboard
 */
export default async function ClientDetailPage({ params }: PageProps) {
  const { id } = await params;
  const client = await UserService.getClientById(id);

  if (!client) {
    notFound();
  }

  // Fetch orders for this client
  const orders = await OrderService.getAllOrders();
  const clientOrders = orders.filter(o => o.clientId === id);

  const initials = client.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <>
      <TopBar title={`Client: ${client.name}`} breadcrumb={["Dashboard", "Clients", client.name]} />

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.header__left}>
            <div className={`${styles.avatar} ${styles[`avatar--${client.tier.toLowerCase()}`]}`}>
              {initials}
            </div>
            <div className={styles.title_wrap}>
              <h1 className={styles.title}>{client.name}</h1>
              <span className={styles.company}>{client.companyName}</span>
            </div>
          </div>
          <div className={styles.actions}>
            <button className="btn btn-secondary">📧 Email Client</button>
            <button className="btn btn-primary">✏️ Edit Profile</button>
          </div>
        </div>

        <div className={styles.grid}>
          {/* Sidebar: Profile Info */}
          <div className={styles.side_col}>
            <div className={styles.card}>
              <h2 className={styles.card__title}>📋 Business Profile</h2>
              <div className={styles.info_list}>
                <div className={styles.info_item}>
                  <span className={styles.info_label}>Pricing Tier</span>
                  <div style={{ marginTop: '4px' }}>
                    <span className={`badge badge-info`}>
                      {client.tier} TIER
                    </span>
                  </div>
                </div>
                <div className={styles.info_item}>
                  <span className={styles.info_label}>Account Status</span>
                  <div style={{ marginTop: '4px' }}>
                    <span className={`badge ${client.status === 'ACTIVE' ? 'badge-success' : 'badge-warning'}`}>
                      {client.status}
                    </span>
                  </div>
                </div>
                <div className={styles.info_item}>
                  <span className={styles.info_label}>Email Address</span>
                  <span className={styles.info_value}>{client.email}</span>
                </div>
                <div className={styles.info_item}>
                  <span className={styles.info_label}>Phone Number</span>
                  <span className={styles.info_value}>{client.phone}</span>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.card__title}>⭐ Tier Benefits</h2>
              <p className={styles.company}>
                {client.tier === 'GOLD' ? '15% discount on all products.' : 
                 client.tier === 'SILVER' ? '10% discount on all products.' : 
                 '5% discount on all products.'}
              </p>
            </div>
          </div>

          {/* Main: Activity & Orders */}
          <div className={styles.main_col}>
            <div className={styles.stats_grid}>
              <div className={styles.stat}>
                <span className={styles.stat__value}>{client.totalOrders}</span>
                <span className={styles.stat__label}>Lifetime Orders</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.stat__value}>${client.totalSpent.toLocaleString()}</span>
                <span className={styles.stat__label}>Total Value</span>
              </div>
              <div className={styles.stat}>
                <span className={styles.stat__value}>
                  {client.lastOrderDate ? client.lastOrderDate.toLocaleDateString() : 'Never'}
                </span>
                <span className={styles.stat__label}>Last Activity</span>
              </div>
            </div>

            <div className={styles.card}>
              <h2 className={styles.card__title}>📦 Order History</h2>
              {clientOrders.length > 0 ? (
                <div className={styles.orders_list}>
                  {clientOrders.map((order) => (
                    <div key={order.id} className={styles.order_row}>
                      <div className={styles.order_info}>
                        <Link href={`/dashboard/orders/${order.id}`} className={styles.order_number}>
                          ORD-{order.orderNumber}
                        </Link>
                        <span className={styles.order_date}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className={styles.order_meta}>
                        <div className={styles.order_amount}>${order.totalAmount.toLocaleString()}</div>
                        <span className={`badge badge-info`} style={{ fontSize: '10px' }}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.company}>No orders found for this client.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
