#!/bin/bash
shopt -s xpg_echo
m=$(date +"%M")
if [ $m -lt 5 ]; then
echo "===$(date) Start ===" > /mnt/log/game/ppwp/cron.log
fi
echo "===$(date) 1st ===" >> /mnt/log/game/ppwp/cron.log
/usr/bin/php /mnt/log/game/ppwp/json/prov.php >> /mnt/log/game/ppwp/cron.log
/usr/bin/git -C /mnt/log/game/ppwp/ pull origin main
/usr/bin/git -C /mnt/log/game/ppwp/ add .
/usr/bin/git -C /mnt/log/game/ppwp/ commit -m "Auto `date "+ %A, %d-%m-%Y %H.%M.%S"`"
/usr/bin/git -C /mnt/log/game/ppwp/ push
sleep 20
echo "===$(date) 2nd ===" >> /mnt/log/game/ppwp/cron.log
/usr/bin/php /mnt/log/game/ppwp/json/prov.php >> /mnt/log/game/ppwp/cron.log
echo "\n===$(date) END ===\n\n" >> /mnt/log/game/ppwp/cron.log
/usr/bin/git -C /mnt/log/game/ppwp/ pull origin main
/usr/bin/git -C /mnt/log/game/ppwp/ add .
/usr/bin/git -C /mnt/log/game/ppwp/ commit -m "Auto `date "+ %A, %d-%m-%Y %H.%M.%S"`"
/usr/bin/git -C /mnt/log/game/ppwp/ push
exit 0
