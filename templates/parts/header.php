 <?php
    //security
    if (!defined('ABSPATH')) {
        exit("You are not allowed to access this file directly.");
    }
    ?>
 <?php $mode = getTerminalPluginMode(); ?>
 <div class="t-header">
     <div class="t-row">
         <div class="t-col-4">
             <h2 class="t-title"><?php echo esc_html($title); ?></h2>
         </div>
         <div class="t-col-4 t-center">
             <a href="<?php echo esc_url(admin_url('admin.php?page=terminal-africa')) ?>" class="t-header-logo">
                 <img src="<?php echo esc_url(TERMINAL_AFRICA_PLUGIN_ASSETS_URL . '/img/logo.svg') ?>" alt="Terminal Africa">
             </a>
         </div>
         <div class="t-col-4">
             <div class="t-right">
                 <div class="t-flex">
                     <p class="t-m-p-0 <?php echo $mode == "test" ? "t-signal-sandbox" : "t-signal"; ?>">
                         <?php echo esc_html(ucfirst($mode)); ?> Mode
                     </p>
                     <a href="javascript:;" id="t-sign-out" class="t-sign-out">
                         Sign Out
                     </a>
                 </div>
             </div>
         </div>
     </div>
 </div>
 <?php
    $TerminalAfricaShippingPlugin = TerminalAfricaShippingPlugin::instance();
    //check if plugin update is available
    if ($TerminalAfricaShippingPlugin->check_plugin_update()):
        //create update link with nonce
        $update_link = wp_nonce_url(self_admin_url('update.php?action=upgrade-plugin&plugin=') . "terminal-africa/terminal-africa.php", 'upgrade-plugin_' . "terminal-africa/terminal-africa.php");
    ?>
     <div class="t-check-plugin-update">
         <p>
             A new version of Terminal Africa is available. Click <a href="<?php echo esc_url($update_link); ?>" id="t-check-plugin-update">here</a> to update.
         </p>
     </div>
 <?php
    endif;
    ?>